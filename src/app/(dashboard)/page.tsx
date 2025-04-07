import {
  AverageTicketsCreated,
  LatestEntries,
  Metrics,
} from "@/components/chart-blocks";
import Container from "@/components/container";

export default function Home() {
  return (
    <div>
      <Metrics 
      file="metrics.json"
      />
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-5 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-3">
          <AverageTicketsCreated 
          title="Emails Monitored" 
          file="averages.json" 
          series1="emails" 
          series2="errors_caught"
          />
        </Container>
        <Container className="py-4 laptop:col-span-2">
          <LatestEntries title="Latest Emails" file="latest.json" />
        </Container>
      </div>
      {/* <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-2 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-1">
          <LatestEmails />
        </Container>
        {/* <Container className="py-4 laptop:col-span-1">
          <CustomerSatisfication />
        </Container> 
      </div> */}
    </div>
  );
}
