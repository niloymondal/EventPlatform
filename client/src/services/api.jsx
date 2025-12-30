import axios from "axios";

const API = axios.create({
  baseURL: "https://event-platform-ten-tau.vercel.app/"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
