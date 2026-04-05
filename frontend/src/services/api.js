import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-project-umuy.onrender.com/api"
});

// ✅ Safe interceptor (works on Vercel + browser)
API.interceptors.request.use(
  (req) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;