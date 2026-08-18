import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SEVERITY_COLORS = {
  critical: "#d32f2f",
  high: "#ed6c02",
  medium: "#fbc02d",
  low: "#2e7d32",
};

const getSeverityColor = (name) => {
  const key = (name || "").toLowerCase();
  return SEVERITY_COLORS[key] || "#8884d8";
};

export default function AlertSeverityChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getSeverityColor(entry.name)}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}