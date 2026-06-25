import { useState } from "react";
import api from "../services/api";

interface Props {
  candidateId: number;
}

function UploadResume({ candidateId }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(
        `/candidates/${candidateId}/upload-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button onClick={uploadResume} style={{ marginLeft: "10px" }}>
        Upload Resume
      </button>
    </div>
  );
}

export default UploadResume;