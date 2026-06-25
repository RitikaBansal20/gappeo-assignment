interface Props {
  title: string;
  value: number | string;
}

function DashboardCard({ title, value }: Props) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "220px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        textAlign: "center",
      }}
    >
      <h1>{value}</h1>

      <p>{title}</p>
    </div>
  );
}

export default DashboardCard;