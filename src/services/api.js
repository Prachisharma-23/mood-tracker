import axios from "axios";

const API = axios.create({
  baseURL: "https://mdtrack.onrender.com/api",
});

export default API;
