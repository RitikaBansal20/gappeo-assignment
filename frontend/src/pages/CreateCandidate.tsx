import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateCandidate() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    job_id: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const response = await api.get("/jobs/");
    setJobs(response.data);
  };

  const handleChange = (e: any) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await api.post("/candidates/", {
      ...candidate,
      job_id: Number(candidate.job_id),
    });

    alert("Candidate Added Successfully!");
    navigate("/candidates");
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px" }}>
      <h2>Create Candidate</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="experience"
          placeholder="Experience"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="skills"
          placeholder="Skills"
          onChange={handleChange}
        />
        <br /><br />

        <select
          name="job_id"
          onChange={handleChange}
        >
          <option value="">Select Job</option>

          {jobs.map((job: any) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}

        </select>

        <br /><br />

        <button type="submit">
          Add Candidate
        </button>

      </form>
    </div>
  );
}

export default CreateCandidate;