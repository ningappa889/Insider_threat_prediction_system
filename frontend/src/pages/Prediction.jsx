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
    if (form.activity_type === "") {
      alert("Please select an Activity Type.");
      return;
    }

    if (
      Number(form.risk_score) < 0 ||
      Number(form.risk_score) > 100
    ) {
      alert("Risk Score must be between 0 and 100.");
      return;
    }
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
                select
                fullWidth
                label="Activity Type"
                name="activity_type"
                value={form.activity_type}
                onChange={handleChange}
              >
                <MenuItem value="LOGIN">LOGIN</MenuItem>
                <MenuItem value="LOGOUT">LOGOUT</MenuItem>
                <MenuItem value="FILE_ACCESS">FILE_ACCESS</MenuItem>
                <MenuItem value="USB_INSERT">USB_INSERT</MenuItem>
                <MenuItem value="EMAIL_SENT">EMAIL_SENT</MenuItem>
                <MenuItem value="PRIVILEGE_ESCALATION">PRIVILEGE_ESCALATION</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Risk Score"
                type="number"
                name="risk_score"
                value={form.risk_score}
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 1,
                }}
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
                size="large"
                onClick={handlePredict}
                disabled={
                  loading ||
                  form.activity_type === "" ||
                  form.risk_score === ""
                }
              >
                Predict Threat
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {result && (
          <Paper sx={{ mt: 4, p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              AI Prediction Result
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
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recommendation
              </Typography>

              <Typography>
                {result.risk_level === "Critical"
                  ? "Immediately investigate the user and restrict system access."
                  : result.risk_level === "High"
                  ? "Review recent activities and monitor the user closely."
                  : result.risk_level === "Medium"
                  ? "Continue monitoring for suspicious behavior."
                  : "No immediate action required."}
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}