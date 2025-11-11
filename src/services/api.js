import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-9bnq.onrender.com/api",
});

export default API;
