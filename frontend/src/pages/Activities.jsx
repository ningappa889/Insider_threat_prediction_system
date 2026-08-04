import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get("/activities/");
      setActivities(response.data);
    } catch (err) {
      console.error("Failed to load activities:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch ((severity || "").toLowerCase()) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "error";
      case "critical":
        return "error";
      default:
        return "default";
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          Activities
        </Typography>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>ID</b></TableCell>
                    <TableCell><b>Activity</b></TableCell>
                    <TableCell><b>Risk Score</b></TableCell>
                    <TableCell><b>Severity</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>User ID</b></TableCell>
                    <TableCell><b>Created At</b></TableCell>                  </TableRow>
                </TableHead>

                <TableBody>
                  {activities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No activities found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.id}</TableCell>
                        <TableCell>{activity.activity_type}</TableCell>
                        <TableCell>{activity.risk_score}</TableCell>
                        <TableCell>
                          <Chip
                            label={activity.severity}
                            color={getSeverityColor(activity.severity)}
                          />
                        </TableCell>
                        <TableCell>{activity.status}</TableCell>
                        <TableCell>{activity.user_id}</TableCell>
                        <TableCell>{formatDate(activity.created_at)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </Box>
  );
}