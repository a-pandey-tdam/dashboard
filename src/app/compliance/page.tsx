import {
  AverageTicketsCreated,
  LatestEntries,
  Metrics,
  TicketByChannels,
} from "@/components/chart-blocks";
import Container from "@/components/container";

export default function Compliance() {
  return (
    <div>
      <Metrics file="compliance_metrics.json"/>
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-5 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-3">
          <AverageTicketsCreated title="Checked Documents" file="compliance_averages.json" series1="runs" series2="documents"/>
        </Container>
        <Container className="py-4 laptop:col-span-2">
          <TicketByChannels title="Document Types" file="compliance_doc_type.json" label="Total Document Scans" />
          
        </Container>
      </div>
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-2 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-2">
        <LatestEntries title="Latest Files" file="compliance_latest.json"/>
        </Container>
       <Container className="py-4 laptop:col-span-1">
          {/* <CustomerSatisfication /> */}
        </Container> 
      </div>
    </div>
  );
}