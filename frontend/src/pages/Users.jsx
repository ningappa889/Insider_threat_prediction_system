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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/");
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
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
          Users
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
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Email</b></TableCell>
                    <TableCell><b>Department</b></TableCell>
                    <TableCell><b>Role</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Joined</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>{user.id}</TableCell>

                        <TableCell>{user.full_name}</TableCell>

                        <TableCell>{user.email}</TableCell>

                        <TableCell>
                          {user.department || "-"}
                        </TableCell>

                        <TableCell>{user.role}</TableCell>

                        <TableCell>
                          <Chip
                            label={
                              user.is_active
                                ? "Active"
                                : "Inactive"
                            }
                            color={
                              user.is_active
                                ? "success"
                                : "error"
                            }
                            size="small"
                          />
                        </TableCell>

                        <TableCell>
                          {formatDate(user.created_at)}
                        </TableCell>
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