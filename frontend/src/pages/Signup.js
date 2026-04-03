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

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const signup = async () => {
    try {
      await API.post("/auth/signup", form);
      toast.success("Account created!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data || "Signup failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
        <Typography variant="h5" mb={2}>
          Signup
        </Typography>

        <TextField
          fullWidth
          label="Username"
          sx={{ mt: 2 }}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

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

        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={signup}>
          Signup
        </Button>
      </Box>
    </Container>
  );
}