import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "#1f2937",
        color: "white",
        minHeight: "100vh",
        padding: "25px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginBottom: "35px",
          textAlign: "center",
        }}
      >
        Gappeo ATS
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <Link style={linkStyle} to="/">
          📊 Dashboard
        </Link>

        <Link style={linkStyle} to="/jobs">
          💼 Jobs
        </Link>

        <Link style={linkStyle} to="/create-job">
          ➕ Create Job
        </Link>

        <Link style={linkStyle} to="/candidates">
          👥 Candidates
        </Link>

        <Link style={linkStyle} to="/create-candidate">
          ➕ Add Candidate
        </Link>
      </nav>
    </aside>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "12px",
  borderRadius: "8px",
  background: "#374151",
} as const;

export default Sidebar;