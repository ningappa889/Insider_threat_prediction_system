import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Alerts from "./pages/Alerts";
import Prediction from "./pages/Prediction";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/prediction" element={<Prediction />} />
    </Routes>
  );
}