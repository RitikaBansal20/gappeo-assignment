import axios from "axios";

const api = axios.create({
  baseURL: "https://gappeo-assignment.onrender.com",
});

export default api;