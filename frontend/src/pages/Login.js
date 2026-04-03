import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          sx={{ mt: 2 }}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          sx={{ mt: 2 }}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={login}>
          Login
        </Button>
      </Box>
    </Container>
  );
}