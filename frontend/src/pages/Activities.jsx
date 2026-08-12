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
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    let filtered = [...activities];

    if (search.trim() !== "") {
      filtered = filtered.filter((activity) =>
        activity.activity_type
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (severityFilter !== "All") {
      filtered = filtered.filter(
        (activity) => activity.severity === severityFilter
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (activity) => activity.status === statusFilter
      );
    }

    setFilteredActivities(filtered);
  }, [activities, search, severityFilter, statusFilter]);

  const fetchActivities = async () => {
    try {
      const response = await api.get("/activities/");
      setActivities(response.data);
      setFilteredActivities(response.data);
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
      case "critical":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const utcString =
      typeof dateString === "string" &&
      !dateString.endsWith("Z") &&
      !dateString.includes("+")
        ? dateString + "Z"
        : dateString;

    return new Date(utcString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const exportCSV = () => {
    const headers = [
      "Activity Type",
      "Severity",
      "Risk Score",
      "Status",
      "User ID",
      "Created At",
    ];

    const rows = filteredActivities.map((activity) => [
      activity.activity_type,
      activity.severity,
      activity.risk_score,
      activity.status,
      activity.user_id,
      formatDate(activity.created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    const today = new Date().toISOString().split("T")[0];
    link.download = `activities_${today}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
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

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Activities
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px,1fr))",
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            label="Search Activity"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            fullWidth
            label="Severity"
            value={severityFilter}
            onChange={(e) =>
              setSeverityFilter(e.target.value)
            }
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </TextField>
        </Box>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 5,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  color="text.secondary"
                >
                  Showing {filteredActivities.length} of{" "}
                  {activities.length} activities
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={exportCSV}
                >
                  Export CSV
                </Button>
              </Box>

              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>ID</b></TableCell>
                      <TableCell><b>Activity</b></TableCell>
                      <TableCell><b>Risk Score</b></TableCell>
                      <TableCell><b>Severity</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>User ID</b></TableCell>
                      <TableCell><b>Created At</b></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredActivities.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          align="center"
                        >
                          No activities found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredActivities.map((activity) => (
                        <TableRow
                          key={activity.id}
                          hover
                        >
                          <TableCell>
                            {activity.id}
                          </TableCell>

                          <TableCell>
                            {activity.activity_type}
                          </TableCell>

                          <TableCell>
                            {activity.risk_score}
                          </TableCell>

                          <TableCell>
                            <Chip
                              label={activity.severity}
                              color={getSeverityColor(
                                activity.severity
                              )}
                              size="small"
                            />
                          </TableCell>

                          <TableCell>
                            {activity.status}
                          </TableCell>

                          <TableCell>
                            {activity.user_id}
                          </TableCell>

                          <TableCell>
                            {formatDate(
                              activity.created_at
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}