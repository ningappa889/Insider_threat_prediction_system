import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";

import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.department ||
      !formData.password
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        full_name: formData.full_name,
        email: formData.email,
        department: formData.department,
        password: formData.password,
      });

      alert("Registration successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Card sx={{ width: 450, p: 2 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            Create Account
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Register a new user
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Select Department</em>
            </MenuItem>

            <MenuItem value="Computer Science">
              Computer Science
            </MenuItem>

            <MenuItem value="Information Technology">
              Information Technology
            </MenuItem>

            <MenuItem value="Cyber Security">
              Cyber Security
            </MenuItem>

            <MenuItem value="Network Security">
              Network Security
            </MenuItem>

            <MenuItem value="Human Resources">
              Human Resources
            </MenuItem>

            <MenuItem value="Finance">
              Finance
            </MenuItem>

            <MenuItem value="Administration">
              Administration
            </MenuItem>

            <MenuItem value="Operations">
              Operations
            </MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "REGISTER"}
          </Button>

          <Typography
            align="center"
            sx={{ mt: 3 }}
          >
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}