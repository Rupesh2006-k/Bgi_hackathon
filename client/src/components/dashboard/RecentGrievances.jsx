import { motion } from "framer-motion";

const tableData = [
  {
    id: "#GR-2929",
    subject: "Garbage collection missed",
    dept: "Sanitation",
    status: "RESOLVED",
    priority: "LOW",
    time: "42m ago",
  },
  {
    id: "#GR-2928",
    subject: "Garbage collection missed",
    dept: "Sanitation",
    status: "RESOLVED",
    priority: "LOW",
    time: "48m ago",
  },
  {
    id: "#GR-2927",
    subject: "Water leakage near park",
    dept: "Water",
    status: "OPEN",
    priority: "MEDIUM",
    time: "55m ago",
  },
  {
    id: "#GR-2928",
    subject: "Garbage collection missed",
    dept: "Sanitation",
    status: "RESOLVED",
    priority: "LOW",
    time: "48m ago",
  },
  {
    id: "#GR-2927",
    subject: "Water leakage near park",
    dept: "Water",
    status: "OPEN",
    priority: "MEDIUM",
    time: "55m ago",
  },
  {
    id: "#GR-2928",
    subject: "Garbage collection missed",
    dept: "Sanitation",
    status: "RESOLVED",
    priority: "LOW",
    time: "48m ago",
  },
  {
    id: "#GR-2927",
    subject: "Water leakage near park",
    dept: "Water",
    status: "OPEN",
    priority: "MEDIUM",
    time: "55m ago",
  },
  {
    id: "#GR-2926",
    subject: "Broken road divider",
    dept: "Roads & Transport",
    status: "IN PROGRESS",
    priority: "HIGH",
    time: "1h ago",
  },
  {
    id: "#GR-2925",
    subject: "Overflowing dustbin",
    dept: "Sanitation",
    status: "RESOLVED",
    priority: "LOW",
    time: "2h ago",
  },
];

const getStatusClass = (status) => {
  if (status === "RESOLVED") return "bg-green-50 text-green-600";
  if (status === "OPEN") return "bg-orange-50 text-orange-500";
  return "bg-yellow-50 text-yellow-600";
};

const getPriorityClass = (priority) => {
  if (priority === "HIGH") return "bg-black text-white";
  if (priority === "MEDIUM") return "bg-orange-500 text-white";
  return "bg-gray-100 text-gray-600";
};

const RecentGrievances = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.5 }}
      className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <h2 className="text-base font-semibold text-black">
          Recent Grievances
        </h2>

        <button className="text-xs font-medium text-orange-500 transition hover:text-black">
          View All Records
        </button>
      </div>

      {/* Table */}
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="sticky top-0 z-10 bg-orange-50 text-xs font-medium text-gray-500">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">SUBJECT</th>
              <th className="px-5 py-4">DEPARTMENT</th>
              <th className="px-5 py-4">STATUS</th>
              <th className="px-5 py-4">PRIORITY</th>
              <th className="px-5 py-4">TIME</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <motion.tr
                key={`${row.id}-${index}`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="border-t border-gray-100 transition hover:bg-orange-50/60"
              >
                {/* ID */}
                <td className="px-5 py-4 text-sm font-medium text-black">
                  {row.id}
                </td>

                {/* Subject */}
                <td className="px-5 py-4 text-sm text-gray-800">
                  {row.subject}
                </td>

                {/* Department */}
                <td className="px-5 py-4 text-sm text-gray-600">{row.dept}</td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${getStatusClass(
                      row.status,
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Priority */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${getPriorityClass(
                      row.priority,
                    )}`}
                  >
                    {row.priority}
                  </span>
                </td>

                {/* Time */}
                <td className="px-5 py-4 text-xs text-gray-400">{row.time}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentGrievances;
