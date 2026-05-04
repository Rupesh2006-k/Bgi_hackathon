import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const trendData = [
  { date: "01 Oct", current: 180, previous: 210 },
  { date: "05 Oct", current: 240, previous: 280 },
  { date: "08 Oct", current: 160, previous: 190 },
  { date: "12 Oct", current: 310, previous: 340 },
  { date: "15 Oct", current: 520, previous: 570 },
  { date: "18 Oct", current: 390, previous: 430 },
  { date: "22 Oct", current: 130, previous: 170 },
  { date: "26 Oct", current: 620, previous: 680 },
  { date: "30 Oct", current: 360, previous: 420 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-orange-100 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-gray-500">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="text-sm font-semibold text-black">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
};

const TrendChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.4 }}
      className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-base font-semibold text-black">
          Daily Complaints Trend
        </h2>
        <p className="text-xs text-gray-400">
          Volume tracking across the current month.
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="current"
              name="Current"
              stroke="#111827"
              strokeWidth={4}
              dot={false}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="previous"
              name="Previous"
              stroke="#f97316"
              strokeWidth={4}
              dot={false}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TrendChart;