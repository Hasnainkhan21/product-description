import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3005/api", 
});

// For requests that require auth later
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
