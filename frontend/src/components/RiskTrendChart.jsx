import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", risk: 12 },
  { day: "Tue", risk: 18 },
  { day: "Wed", risk: 9 },
  { day: "Thu", risk: 27 },
  { day: "Fri", risk: 22 },
  { day: "Sat", risk: 15 },
  { day: "Sun", risk: 30 },
];

export default function RiskTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="risk"
          stroke="#1976d2"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}