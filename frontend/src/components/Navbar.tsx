import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  return (
    <header
      style={{
        height: "70px",
        background: "#2563eb",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontWeight: "bold",
          }}
        >
          🚀 Gappeo ATS
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Welcome, Admin 👋
        </span>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;