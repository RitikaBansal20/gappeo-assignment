import { useState } from "react";
import api from "../services/api";

interface Props {
  candidateId: number;
}

function MatchResult({ candidateId }: Props) {
  const [result, setResult] = useState<any>(null);

  const analyzeResume = async () => {
    try {
      const response = await api.get(`/candidates/${candidateId}/match`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to analyze resume.");
    }
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <button onClick={analyzeResume}>
        Analyze Resume
      </button>

      {result && (
        <div
          style={{
            marginTop: "15px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            background: "#f9f9f9",
          }}
        >
          <h4>AI Match Result</h4>

          <p><b>Score:</b> {result.score}%</p>

          <p><b>Recommendation:</b> {result.recommendation}</p>

          <p>
            <b>Matched Skills:</b>
          </p>

          <ul>
            {result.matched_skills.map((skill: string) => (
              <li key={skill}>✅ {skill}</li>
            ))}
          </ul>

          <p>
            <b>Missing Skills:</b>
          </p>

          <ul>
            {result.missing_skills.map((skill: string) => (
              <li key={skill}>❌ {skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MatchResult;