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
  TablePagination,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { formatDate } from "../utils/dateFormatter";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

    if (dateFilter) {
      filtered = filtered.filter((activity) => {
        if (!activity.created_at) return false;
        const actDate = String(activity.created_at).split("T")[0].split(" ")[0];
        return actDate === dateFilter;
      });
    }

    setFilteredActivities(filtered);
    setPage(0);
  }, [activities, search, severityFilter, statusFilter, dateFilter]);

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
          backgroundColor: "background.default",
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
              "repeat(auto-fit, minmax(200px,1fr))",
            gap: 2,
            mb: 3,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            label="Search Activity"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            fullWidth
            label="Filter Date"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              inputLabel: { shrink: true }
            }}
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

          {(search || severityFilter !== "All" || statusFilter !== "All" || dateFilter) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setSearch("");
                setSeverityFilter("All");
                setStatusFilter("All");
                setDateFilter("");
              }}
              sx={{ height: 56 }}
            >
              Clear Filters
            </Button>
          )}
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
                      filteredActivities
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((activity) => (
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
                              size="small"
                              sx={{
                                ...getSeverityColor(
                                  activity.severity
                                ),
                                fontWeight: 600,
                                minWidth: 80,
                              }}
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

              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={filteredActivities.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}