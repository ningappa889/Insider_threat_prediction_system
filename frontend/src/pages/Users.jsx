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
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { formatDate } from "../utils/dateFormatter";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  // Search Filter
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );



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

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Users
        </Typography>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 4,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                label="Search Users"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 3 }}
              />

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>ID</b>
                      </TableCell>

                      <TableCell>
                        <b>Name</b>
                      </TableCell>

                      <TableCell>
                        <b>Email</b>
                      </TableCell>

                      <TableCell>
                        <b>Department</b>
                      </TableCell>

                      <TableCell>
                        <b>Role</b>
                      </TableCell>

                      <TableCell>
                        <b>Status</b>
                      </TableCell>

                      <TableCell>
                        <b>Joined</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
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
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}