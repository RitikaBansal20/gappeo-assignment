import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  employment_type: string;
  experience: string;
  skills: string;
  description: string;
}

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.skills.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredJobs(filtered);
  }, [search, jobs]);

  const loadJobs = async () => {
    try {
      const response = await api.get("/jobs/");
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);

      alert("Job deleted successfully.");

      loadJobs();
    } catch (error) {
      console.error(error);
      alert("Unable to delete job.");
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
        <h1>Jobs</h1>

        <button
          onClick={() => navigate("/create-job")}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Create Job
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by title, company or skills..."
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
        <p>Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{job.title}</h2>

            <p>
              <strong>Company:</strong> {job.company}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Employment Type:</strong>{" "}
              {job.employment_type}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {job.experience}
            </p>

            <p>
              <strong>Skills:</strong> {job.skills}
            </p>

            <p>
              <strong>Description:</strong>
            </p>

            <p>{job.description}</p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  navigate(`/edit-job/${job.id}`)
                }
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteJob(job.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
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

export default Jobs;