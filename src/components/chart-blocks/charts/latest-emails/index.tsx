"use client"

import Container from "@/components/container";
import { fetchData } from "@/api/fetchData";
import ChartTitle from "../../components/chart-title";
import { CirclePercent } from "lucide-react";

import { useState, useEffect } from 'react'

type Latest = {
  date: string;
  id: string;
  subject: string;
}

export default function LatestEmails() {
  const [latest, setLatest] = useState<Latest[]>([]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    async function getMetrics(){
      try{
        const data = await fetchData<Latest[]>('latest.json')
        setLatest(data);
      } catch (error){
        console.error('Error fetching metric data:', error);
      }
    }
    getMetrics();

    timerId = setInterval(getMetrics, 60_000);

    return () => clearInterval(timerId)
  }, []);

  return (
    <section className="flex h-full flex-col gap-4 p-4">
      <ChartTitle title="Latest Emails" icon={CirclePercent} />
      <Container className="overflow-x-auto mt-5">
        <div className="max-h-80 overflow-y-auto rounded-lg shadow-md">
          <table className="w-full bg-white border border-gray-200"> {/* Adjusted to w-full */}
            <thead className="bg-blue-50 sticky top-0">
              <tr>
                <th className="py-3 px-6 border-b border-gray-300 text-left text-blue-700 font-bold">Date</th>
                <th className="py-3 px-6 border-b border-gray-300 text-left text-blue-700 font-bold">ID</th>
                <th className="py-3 px-6 border-b border-gray-300 text-left text-blue-700 font-bold">Subject</th>
              </tr>
            </thead>
            <tbody>
              {latest.map((last, index) => (
                <tr key={last.id} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                  <td className="text-sm py-3 px-6 border-b border-gray-300 text-gray-700">{last.date}</td>
                  <td className="text-sm py-3 px-6 border-b border-gray-300 text-gray-700">{last.id}</td>
                  <td className="text-sm py-3 px-6 border-b border-gray-300 text-gray-700">{last.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )};