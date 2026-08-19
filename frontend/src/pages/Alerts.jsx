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
  TextField,
  MenuItem,
  Button,
  TableContainer,
  TablePagination,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { formatDate } from "../utils/dateFormatter";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    let filtered = [...alerts];

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (alert) =>
          alert.alert_type
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          alert.description
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (severityFilter !== "All") {
      filtered = filtered.filter(
        (alert) => alert.severity === severityFilter
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((alert) => {
        if (!alert.created_at) return false;
        const alertDate = String(alert.created_at).split("T")[0].split(" ")[0];
        return alertDate === dateFilter;
      });
    }

    setFilteredAlerts(filtered);
    setPage(0);
  }, [alerts, search, severityFilter, dateFilter]);

  const fetchAlerts = async () => {
    try {
      const response = await api.get("/alerts/");

      setAlerts(response.data);
      setFilteredAlerts(response.data);
    } catch (error) {
      console.error("Failed to load alerts:", error);
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
      "User ID",
      "Alert Type",
      "Risk Score",
      "Severity",
      "Description",
      "Created At",
    ];

    const rows = filteredAlerts.map((alert) => [
      alert.user_id,
      alert.alert_type,
      alert.risk_score,
      alert.severity,
      alert.description,
      formatDate(alert.created_at),
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

    const today = new Date().toISOString().split("T")[0];

    link.href = url;
    link.download = `alerts_${today}.csv`;

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
          Security Alerts
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
            mb: 3,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            label="Search Alert"
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
            <MenuItem value="Critical">
              Critical
            </MenuItem>
          </TextField>

          {(search || severityFilter !== "All" || dateFilter) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setSearch("");
                setSeverityFilter("All");
                setDateFilter("");
              }}
              sx={{ height: 56 }}
            >
              Clear Filters
            </Button>
          )}
        </Box>

        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: 3,
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
            <Typography color="text.secondary">
              Showing {filteredAlerts.length} of{" "}
              {alerts.length} alerts
            </Typography>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={exportCSV}
            >
              Export CSV
            </Button>
          </Box>

          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>User</b></TableCell>
                  <TableCell><b>Alert Type</b></TableCell>
                  <TableCell><b>Risk Score</b></TableCell>
                  <TableCell><b>Severity</b></TableCell>
                  <TableCell><b>Description</b></TableCell>
                  <TableCell><b>Created At</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredAlerts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                    >
                      No alerts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAlerts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((alert) => (
                    <TableRow
                      key={alert.id}
                      hover
                    >
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
                            ...getSeverityColor(
                              alert.severity
                            ),
                            fontWeight: 600,
                            minWidth: 80,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        {alert.description}
                      </TableCell>

                      <TableCell>
                        {formatDate(
                          alert.created_at
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
            count={filteredAlerts.length}
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