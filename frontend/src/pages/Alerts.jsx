import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Toolbar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      console.log(
        "Stored token:",
        localStorage.getItem("access_token")
      );

      const response = await api.get("/alerts/");

      console.log("SUCCESS");
      console.log(response.data);

      setAlerts(response.data);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("RESPONSE:", error.response?.data);
      console.log("REQUEST HEADERS:", error.config?.headers);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch ((severity || "").toLowerCase()) {
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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

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

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Security Alerts
        </Typography>

        <Paper
          elevation={3}
          sx={{
            mt: 3,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>User</b>
                </TableCell>
                <TableCell>
                  <b>Alert Type</b>
                </TableCell>
                <TableCell>
                  <b>Risk Score</b>
                </TableCell>
                <TableCell>
                  <b>Severity</b>
                </TableCell>
                <TableCell>
                  <b>Description</b>
                </TableCell>
                <TableCell>
                  <b>Created At</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {alerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No alerts found.
                  </TableCell>
                </TableRow>
              ) : (
                alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>{alert.id}</TableCell>

                    <TableCell>
                      {alert.user_id ?? "-"}
                    </TableCell>

                    <TableCell>
                      {alert.alert_type}
                    </TableCell>

                    <TableCell>
                      {alert.risk_score}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={alert.severity}
                        size="small"
                        sx={{
                          ...getSeverityColor(alert.severity),
                          fontWeight: 600,
                          minWidth: 80,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {alert.description}
                    </TableCell>

                    <TableCell>
                      {alert.created_at
                        ? new Date(alert.created_at).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}