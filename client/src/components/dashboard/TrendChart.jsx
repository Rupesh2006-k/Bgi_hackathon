import { useEffect, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setComplaints } from "../../features/complaintSlice";
import { getAllComplaintService } from "../../services/complaintService";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-orange-100 bg-white px-4 py-3 shadow-xl">
      <p className="mb-2 text-xs font-bold text-gray-500">{label}</p>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="mb-1 flex items-center justify-between gap-5"
        >
          <span
            className="text-xs font-semibold"
            style={{ color: item.color }}
          >
            {item.name}
          </span>

          <span className="text-sm font-bold text-black">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const TrendChart = () => {
  const dispatch = useDispatch();

  const complaints = useSelector((state) => state.complaint.complaints);

  const fetchComplaints = async () => {
    try {
      const res = await getAllComplaintService();

      if (res?.success) {
        dispatch(setComplaints(res.data || []));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!complaints?.length) {
      fetchComplaints();
    }
  }, []);

  const trendData = useMemo(() => {
    const grouped = {};

    complaints?.forEach((item) => {
      if (!item?.createdAt) return;

      const date = formatDate(item.createdAt);

      if (!grouped[date]) {
        grouped[date] = {
          date,
          current: 0,
        };
      }

      grouped[date].current += 1;
    });

    const sortedData = Object.values(grouped).sort((a, b) => {
      return (
        new Date(`2026 ${a.date}`) - new Date(`2026 ${b.date}`)
      );
    });

    return sortedData.map((item, index, arr) => ({
      ...item,

      // previous line smoother banane ke liye
      previous:
        arr[index - 1]?.current || Math.max(item.current - 1, 0),
    }));
  }, [complaints]);

  const highestDay = trendData.reduce((max, item) => {
    if (!max || item.current > max.current) return item;
    return max;
  }, null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.4 }}
      className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">
            Daily Complaints Trend
          </h2>

          <p className="text-sm text-gray-400">
            Volume tracking across the current month.
          </p>
        </div>

        {highestDay && (
          <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-2">
            <p className="text-xs font-semibold text-orange-500">
              Highest Complaints
            </p>

            <h3 className="text-sm font-bold text-black">
              {highestDay.date} • {highestDay.current} complaints
            </h3>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              stroke="#9ca3af"
            />

            <YAxis
              hide
              allowDecimals={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{
                paddingTop: 20,
                fontSize: 13,
                fontWeight: 600,
              }}
            />

            {/* Current */}
            <Line
              type="monotone"
              dataKey="current"
              name="Current"
              stroke="#111827"
              strokeWidth={4}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#111827",
              }}
              activeDot={{
                r: 7,
                stroke: "#111827",
                strokeWidth: 2,
              }}
              animationDuration={1200}
            />

            {/* Previous */}
            <Line
              type="monotone"
              dataKey="previous"
              name="Previous"
              stroke="#f97316"
              strokeWidth={4}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#f97316",
              }}
              activeDot={{
                r: 7,
                stroke: "#f97316",
                strokeWidth: 2,
              }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TrendChart;