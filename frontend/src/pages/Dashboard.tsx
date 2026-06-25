import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DashboardData {
  jobs: number;
  candidates: number;
  average_score: number;
}

interface Job {
  id: number;
  title: string;
  company: string;
}

interface Candidate {
  id: number;
  name: string;
  score: number;
}

function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    jobs: 0,
    candidates: 0,
    average_score: 0,
  });

  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [recentCandidates, setRecentCandidates] = useState<Candidate[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboard = await api.get("/dashboard");
      const jobs = await api.get("/recent-jobs");
      const candidates = await api.get("/recent-candidates");

      setData(dashboard.data);
      setRecentJobs(jobs.data);
      setRecentCandidates(candidates.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Jobs",
      value: data.jobs,
    },
    {
      name: "Candidates",
      value: data.candidates,
    },
  ];

  const COLORS = ["#2563eb", "#10b981"];

  return (
    <Layout>
      <h1 style={{ marginBottom: "30px" }}>📊 Dashboard</h1>

      {loading ? (
        <p>Loading Dashboard...</p>
      ) : (
        <>
          {/* Cards */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            <DashboardCard
              title="Total Jobs"
              value={data.jobs}
            />

            <DashboardCard
              title="Total Candidates"
              value={data.candidates}
            />

            <DashboardCard
              title="Average Match Score"
              value={`${data.average_score}%`}
            />
          </div>

          {/* Welcome */}

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,.1)",
              marginBottom: "30px",
            }}
          >
            <h2>Welcome to Gappeo ATS 🚀</h2>

            <p>
              This dashboard provides an overview of your recruitment process.
            </p>

            <ul>
              <li>📌 Manage Jobs</li>
              <li>👥 Manage Candidates</li>
              <li>📄 Upload Resumes</li>
              <li>🤖 Analyze Resume Match Score</li>
              <li>📊 Track Recruitment Statistics</li>
            </ul>
          </div>

          {/* Chart */}

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,.1)",
              marginBottom: "30px",
            }}
          >
            <h2>Recruitment Overview</h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Jobs & Candidates */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            {/* Jobs */}

            <div
              style={{
                flex: 1,
                minWidth: "300px",
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,.1)",
              }}
            >
              <h2>Recent Jobs</h2>

              {recentJobs.length === 0 ? (
                <p>No jobs available.</p>
              ) : (
                recentJobs.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <strong>{job.title}</strong>

                    <br />

                    <span>{job.company}</span>
                  </div>
                ))
              )}
            </div>

            {/* Candidates */}

            <div
              style={{
                flex: 1,
                minWidth: "300px",
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,.1)",
              }}
            >
              <h2>Recent Candidates</h2>

              {recentCandidates.length === 0 ? (
                <p>No candidates available.</p>
              ) : (
                recentCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <strong>{candidate.name}</strong>

                    <br />

                    Match Score : {candidate.score ?? 0}%
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Summary */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px,1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "#2563eb",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>Total Jobs</h3>
              <h1>{data.jobs}</h1>
            </div>

            <div
              style={{
                background: "#10b981",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>Total Candidates</h3>
              <h1>{data.candidates}</h1>
            </div>

            <div
              style={{
                background: "#f59e0b",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>Average Match</h3>
              <h1>{data.average_score}%</h1>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Dashboard;