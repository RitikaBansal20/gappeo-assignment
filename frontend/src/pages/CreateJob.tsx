import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    employment_type: "",
    experience: "",
    skills: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await api.post("/jobs/", job);

      alert("Job Created Successfully!");

      navigate("/jobs");
    } catch (error) {
      console.error(error);
      alert("Failed to create job");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px" }}>
      <h2>Create Job</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="employment_type"
          placeholder="Employment Type"
          value={job.employment_type}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="experience"
          placeholder="Experience"
          value={job.experience}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="skills"
          placeholder="Skills"
          value={job.skills}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={job.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Job
        </button>

      </form>
    </div>
  );
}

export default CreateJob;