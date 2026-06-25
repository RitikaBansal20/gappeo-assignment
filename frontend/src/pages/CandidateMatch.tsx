import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";

interface MatchResult {
  candidate: string;
  job: string;
  score: number;
  recommendation: string;
  matched_skills: string[];
  missing_skills: string[];
}

function CandidateMatch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState<MatchResult | null>(null);

  useEffect(() => {
    loadMatch();
  }, []);

  const loadMatch = async () => {
    try {
      const response = await api.get(`/candidates/${id}/match`);
      setMatch(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load match result.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2>Loading Match Result...</h2>
      </Layout>
    );
  }

  if (!match) {
    return (
      <Layout>
        <h2>No Match Result Found</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 style={{ marginBottom: "25px" }}>Resume Match Result</h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
        }}
      >
        <h2>{match.candidate}</h2>

        <p>
          <strong>Applied Job:</strong> {match.job}
        </p>

        <p>
          <strong>Match Score:</strong>{" "}
          <span
            style={{
              color:
                match.score >= 80
                  ? "green"
                  : match.score >= 60
                  ? "orange"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {match.score}%
          </span>
        </p>

        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #10b981",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <strong>Recommendation</strong>

          <p>{match.recommendation}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          <div>
            <h3>Matched Skills</h3>

            <ul>
              {match.matched_skills.map((skill) => (
                <li key={skill}>✅ {skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Missing Skills</h3>

            <ul>
              {match.missing_skills.map((skill) => (
                <li key={skill}>❌ {skill}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={() => navigate("/candidates")}
          style={{
            marginTop: "30px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Candidates
        </button>
      </div>
    </Layout>
  );
}

export default CandidateMatch;