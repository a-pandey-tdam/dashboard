// Define the type for the props
type LatestCardProps = {
    date: string;
    id: string;
    subject: string;
  };
  
  export default function LatestCard({ date, id, subject }: LatestCardProps) {
    return (
      <tr>
        <td>{date}</td>
        <td>{id}</td>
        <td>{subject}</td>
      </tr>
    );
  }