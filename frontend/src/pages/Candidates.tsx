import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: string;
  skills: string;
  score: number;
  resume: string;
  job_id: number;
}

function Candidates() {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidates();
  }, []);

  useEffect(() => {
    const filtered = candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.email.toLowerCase().includes(search.toLowerCase()) ||
        candidate.skills.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCandidates(filtered);
  }, [search, candidates]);

  const loadCandidates = async () => {
    try {
      const response = await api.get("/candidates/");
      setCandidates(response.data);
      setFilteredCandidates(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`/candidates/${id}/upload-resume`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Resume uploaded successfully.");

      loadCandidates();
    } catch (error) {
      console.error(error);
      alert("Resume upload failed.");
    }
  };

  const deleteCandidate = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/candidates/${id}`);

      alert("Candidate deleted successfully.");

      loadCandidates();
    } catch (error) {
      console.error(error);
      alert("Unable to delete candidate.");
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>Candidates</h1>

        <button
          onClick={() => navigate("/create-candidate")}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Candidate
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name, email or skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "25px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {loading ? (
        <p>Loading candidates...</p>
      ) : filteredCandidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{candidate.name}</h2>

            <p>
              <strong>Email:</strong> {candidate.email}
            </p>

            <p>
              <strong>Phone:</strong> {candidate.phone}
            </p>

            <p>
              <strong>Experience:</strong> {candidate.experience}
            </p>

            <p>
              <strong>Skills:</strong> {candidate.skills}
            </p>

            <p>
              <strong>Applied Job ID:</strong> {candidate.job_id}
            </p>

            <p>
              <strong>Resume:</strong>{" "}
              {candidate.resume ? "✅ Uploaded" : "❌ Not Uploaded"}
            </p>

            <p>
              <strong>Match Score:</strong>{" "}
              {candidate.score ? `${candidate.score}%` : "Not Calculated"}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <label
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Upload Resume

                <input
                  hidden
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => uploadResume(candidate.id, e)}
                />
              </label>

              <button
                onClick={() =>
                  navigate(`/candidate-match/${candidate.id}`)
                }
                style={{
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                View Match
              </button>

              <button
                onClick={() =>
                  navigate(`/edit-candidate/${candidate.id}`)
                }
                style={{
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteCandidate(candidate.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Candidates;