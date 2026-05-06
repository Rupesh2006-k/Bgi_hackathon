import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-lg user-select-none border border-orange-100 bg-white px-4 py-3 shadow-lg">
      <p className="text-xs font-bold text-gray-500">{data.name}</p>

      <p className="text-lg font-semibold text-black">{data.count} cases</p>

      <p className="text-xs font-bold text-orange-500">{data.value}%</p>

      {data.highCategory && (
        <p className="mt-1 text-xs font-semibold text-gray-500">
          High Category: {data.highCategory}
        </p>
      )}
    </div>
  );
};

const PriorityChart = () => {
  const dashboardData = useSelector((state) => state.dashboard);

  const total = dashboardData?.totalComplaints || 0;

  const categoryStats = dashboardData?.categoryStats || [];

  const highestCategory = categoryStats.reduce((max, item) => {
    if (!max || item.total > max.total) return item;
    return max;
  }, null);

  const highCategoryName = highestCategory?.category || "Other";

  const getPercentage = (value) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  const priorityData = [
    {
      name: "Pending",
      count: dashboardData?.pendingIssues || 0,
      value: getPercentage(dashboardData?.pendingIssues || 0),
      color: "#f97316",
      highCategory: highCategoryName,
    },
    {
      name: "Resolved",
      count: dashboardData?.resolvedIssues || 0,
      value: getPercentage(dashboardData?.resolvedIssues || 0),
      color: "#111827",
      highCategory: highCategoryName,
    },
    {
      name: "Rejected",
      count: dashboardData?.rejectedIssues || 0,
      value: getPercentage(dashboardData?.rejectedIssues || 0),
      color: "#fb923c",
      highCategory: highCategoryName,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2"
    >
      <h2 className="mb-6 text-base font-bold text-black">Priority Mix</h2>

      <div className="relative h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={priorityData}
              dataKey="value"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              stroke="none"
              animationDuration={900}
            >
              {priorityData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-extrabold text-black">{total}</h3>
          <p className="text-[10px] font-bold text-gray-400">TOTAL CASE</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-bold">
        {priorityData.map((item) => (
          <p key={item.name} className="flex items-center gap-2">
            <span
              style={{ backgroundColor: item.color }}
              className="h-2 w-2 rounded-full"
            />
            {item.name} ({item.value}%)
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default PriorityChart;