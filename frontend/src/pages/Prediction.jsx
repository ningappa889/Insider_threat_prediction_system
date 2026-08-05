import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Toolbar,
  TextField,
  MenuItem,
  Button,
  Chip,
  LinearProgress,
  Autocomplete,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
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
  const activityTypes = [
    "LOGIN",
    "LOGOUT",
    "FAILED_LOGIN",
    "REMOTE_LOGIN",
    "FILE_ACCESS",
    "FILE_DELETE",
    "FILE_MODIFICATION",
    "USB_INSERT",
    "USB_REMOVE",
    "EMAIL_SENT",
    "EMAIL_RECEIVED",
    "POWERSHELL",
    "CMD_EXECUTION",
    "PROCESS_EXECUTION",
    "NETWORK_SCAN",
    "PORT_SCAN",
    "PRIVILEGE_ESCALATION",
    "ADMIN_PRIVILEGE_CHANGE",
    "PASSWORD_CHANGE",
    "APPLICATION_INSTALL",
    "APPLICATION_UNINSTALL",
    "SERVICE_START",
    "SERVICE_STOP",
    "REGISTRY_CHANGE",
    "FIREWALL_CHANGE",
    "VPN_LOGIN",
    "VPN_LOGOUT",
    "RDP_LOGIN",
    "RDP_FAILED_LOGIN",
    "DATABASE_ACCESS",
    "DATABASE_EXPORT",
    "SUSPICIOUS_DOWNLOAD",
    "MALWARE_DETECTED",
  ];

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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:{ 
                xs:"1fr",
                md:"500px 140px 160px 160px 180px",
              },
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                minWidth: {
                  xs: "100%",
                  md: 500,
                },
              }}
            >
              <Autocomplete
                disableClearable
                autoHighlight
                selectOnFocus
                options={activityTypes}
                value={form.activity_type}
                isOptionEqualToValue={(option, value) => option === value}
                onChange={(event, newValue) =>
                  setForm({
                    ...form,
                    activity_type: newValue || "",
                  })
                }
                ListboxProps={{
                  style: {
                    maxHeight: 350,
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Activity Type"
                    placeholder="Search activity..."
                    fullWidth
                  />
                )}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Risk Score"
                type="number"
                name="risk_score"
                value={form.risk_score}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
                    handleChange(e);
                  }
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Box>

            <Box>
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
            </Box>

            <Box>
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
            </Box>

            <Box>
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
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Predict Threat"
                )}
              </Button>
            </Box>
          </Box>
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