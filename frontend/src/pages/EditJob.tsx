import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";

function EditJob() {
  const { id } = useParams();

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

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);

      setJob(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateJob = async (e: any) => {
    e.preventDefault();

    try {
      await api.put(`/jobs/${id}`, job);

      alert("Job Updated Successfully");

      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>Edit Job</h1>

      <form
        onSubmit={updateJob}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "500px",
        }}
      >
        <input
          placeholder="Title"
          value={job.title}
          onChange={(e) =>
            setJob({
              ...job,
              title: e.target.value,
            })
          }
        />

        <input
          placeholder="Company"
          value={job.company}
          onChange={(e) =>
            setJob({
              ...job,
              company: e.target.value,
            })
          }
        />

        <input
          placeholder="Location"
          value={job.location}
          onChange={(e) =>
            setJob({
              ...job,
              location: e.target.value,
            })
          }
        />

        <input
          placeholder="Employment Type"
          value={job.employment_type}
          onChange={(e) =>
            setJob({
              ...job,
              employment_type: e.target.value,
            })
          }
        />

        <input
          placeholder="Experience"
          value={job.experience}
          onChange={(e) =>
            setJob({
              ...job,
              experience: e.target.value,
            })
          }
        />

        <input
          placeholder="Skills"
          value={job.skills}
          onChange={(e) =>
            setJob({
              ...job,
              skills: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          rows={5}
          value={job.description}
          onChange={(e) =>
            setJob({
              ...job,
              description: e.target.value,
            })
          }
        />

        <button
          style={{
            background: "#2563eb",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Job
        </button>
      </form>
    </Layout>
  );
}

export default EditJob;