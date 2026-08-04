import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Toolbar,
  TextField,
  MenuItem,
  Button,
  Grid,
  Chip,
  LinearProgress,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Prediction() {
  const [form, setForm] = useState({
    activity_type: "",
    risk_score: "",
    severity: "Low",
    status: "Success",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    try {
      setLoading(true);

      const response = await api.post("/predict/", {
        activity_type: form.activity_type,
        risk_score: Number(form.risk_score),
        severity: form.severity,
        status: form.status,
      });

      setResult(response.data);
    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Response:", err.response?.data);
      console.log("Headers:", err.config?.headers);
      console.error(err);
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch ((risk || "").toLowerCase()) {
      case "critical":
        return {
          bgcolor: "#d32f2f",
          color: "#fff",
        };

      case "high":
        return {
          bgcolor: "#ed6c02",
          color: "#fff",
        };

      case "medium":
        return {
          bgcolor: "#fbc02d",
          color: "#000",
        };

      case "low":
        return {
          bgcolor: "#2e7d32",
          color: "#fff",
        };

      default:
        return {};
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          AI Threat Prediction
        </Typography>

        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Activity Type"
                name="activity_type"
                value={form.activity_type}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Risk Score"
                type="number"
                name="risk_score"
                value={form.risk_score}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Severity"
                name="severity"
                value={form.severity}
                onChange={handleChange}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <MenuItem value="Success">Success</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handlePredict}
                disabled={loading}
              >
                Predict Threat
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {result && (
          <Paper sx={{ mt: 4, p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Prediction Result
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <b>Prediction:</b> {result.prediction}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>Confidence:</b> {result.confidence}%
            </Typography>

            <LinearProgress
              variant="determinate"
              value={result.confidence}
              sx={{
                height: 10,
                borderRadius: 5,
                mb: 3,
              }}
            />

            <Chip
              label={result.risk_level}
              size="small"
              sx={{
                ...getRiskColor(result.risk_level),
                fontWeight: 600,
                minWidth: 75,
              }}
            />
          </Paper>
        )}
      </Box>
    </Box>
  );
}