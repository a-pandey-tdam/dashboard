"use client"

import Container from "@/components/container";
import { fetchData } from "@/api/fetchData";
import ChartTitle from "../../components/chart-title";
import { CirclePercent } from "lucide-react";

import { useState, useEffect } from 'react'
import type { latestProps } from "@/types/types";
import Loader from "@/components/ui/loader";

// Assuming Latest can have variable keys
type Latest = Record<string, string>;

export default function LatestEntries({title, file}: latestProps) {
  const [latest, setLatest] = useState<Latest[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    async function getData(){
      setLoading(true);
      try{
        const data = await fetchData<Latest[]>(file);
        setLatest(data);

        // Determine fields dynamically from the first data entry
        if (data.length > 0) {
          setFields(Object.keys(data[0]));
        }
      } catch (error){
        // console.error('Error fetching metric data:', error);
      } finally {
        setLoading(false);
      }
    }
    getData();

    const timerId: NodeJS.Timeout = setInterval(getData, 60_000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <section className="flex h-full flex-col gap-4 transition delay-150">
      { loading? (
        <Loader/>
      ) : (
      <>      
      <ChartTitle title={title} icon={CirclePercent} />
      <Container className="overflow-x-auto mt-5">
        <div className="max-h-80 overflow-y-auto rounded-lg shadow-md">
          <table className="w-full bg-white border border-gray-200"> 
            <thead className="bg-blue-50 sticky top-0">
              <tr>
                {fields.map(field => (
                  <th key={field} className="py-3 px-6 border-b border-gray-300 text-left text-blue-700 font-bold">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {latest.map((last, index) => (
                <tr key={last.id || index} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                  {fields.map(field => (
                    <td key={field} className="text-sm py-3 px-6 border-b border-gray-300 text-gray-700">
                      {last[field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
      </> 
      )}

    </section>
  );
}