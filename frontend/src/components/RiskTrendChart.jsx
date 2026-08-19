import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RiskTrendChart({ data = [] }) {
  const safeData = Array.isArray(data) ? data : [];

  const chartData = safeData.map((item) => {
    let dateLabel = item?.date || "";
    try {
      if (item?.date) {
        const d = new Date(item.date);
        if (!isNaN(d.getTime())) {
          dateLabel = d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          });
        }
      }
    } catch (e) {
      dateLabel = String(item?.date || "");
    }
    return {
      ...item,
      date: dateLabel,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis allowDecimals={false} />

        <Tooltip
          formatter={(value) => [`${value} Activities`, "Count"]}
        />

        <Line
          type="monotone"
          dataKey="count"
          stroke="#1976d2"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}