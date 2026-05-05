import { MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useSelector } from "react-redux";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-orange-100 bg-white px-4 py-3 shadow-lg">
      <p className="text-xs font-bold text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-black">{payload[0].value}</p>
    </div>
  );
};

const DepartmentChart = () => {
  const categoryStats = useSelector((state) => state.dashboard.categoryStats);
  const tats = useSelector((state) => state.dashboard);
console.log(tats);

  const departmentData =
    categoryStats?.map((item) => ({
      name: item.category || "Other",
      value: item.total || 0,
    })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-3"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-black">
          Department Distribution
        </h2>
        <MoreVertical size={18} className="text-gray-400" />
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="#f97316"
              radius={[8, 8, 0, 0]}
              barSize={34}
              animationDuration={900}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DepartmentChart;

// import { MoreVertical } from "lucide-react";
// import { motion } from "framer-motion";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const departmentData = [
//   { name: "Sanit.", value: 780 },
//   { name: "Water", value: 520 },
//   { name: "Roads", value: 980 },
//   { name: "Power", value: 410 },
//   { name: "Tax", value: 650 },
//   { name: "Other", value: 300 },
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;

//   return (
//     <div className="rounded-lg border border-orange-100 bg-white px-4 py-3 shadow-lg">
//       <p className="text-xs font-bold text-gray-500">{label}</p>
//       <p className="text-lg font-semibold text-black">{payload[0].value}</p>
//     </div>
//   );
// };

// const DepartmentChart = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -25 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.45, delay: 0.2 }}
//       className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-3"
//     >
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-base font-bold text-black">
//           Department Distribution
//         </h2>
//         <MoreVertical size={18} className="text-gray-400" />
//       </div>

//       <div className="h-72">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={departmentData}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis
//               dataKey="name"
//               tick={{ fontSize: 11, fontWeight: 700 }}
//               axisLine={false}
//               tickLine={false}
//             />
//             <YAxis hide />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar
//               dataKey="value"
//               fill="#f97316"
//               radius={[8, 8, 0, 0]}
//               barSize={34}
//               animationDuration={900}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </motion.div>
//   );
// };

// export default DepartmentChart;
