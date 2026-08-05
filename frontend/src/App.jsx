import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Alerts from "./pages/Alerts";
import Prediction from "./pages/Prediction";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/users" element={<Users />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}