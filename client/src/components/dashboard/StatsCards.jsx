import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { title: "TOTAL", value: "1,284", note: "+8.4%", icon: Clock, color: "text-black" },
  { title: "PENDING", value: "432", note: "Needs attention", icon: Clock, color: "text-orange-500" },
  { title: "RESOLVED", value: "712", note: "85% efficiency", icon: CheckCircle, color: "text-emerald-600" },
  { title: "REJECTED", value: "140", note: "Non-compliant", icon: XCircle, color: "text-red-600" },
  { title: "CRITICAL", value: "56", note: "Immediate action", icon: AlertTriangle, color: "text-red-600", danger: true },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`rounded-xl border bg-white p-5 shadow-sm transition ${
              item.danger ? "border-orange-500" : "border-gray-200"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-extrabold text-gray-400">
                {item.title}
              </p>
              <Icon size={16} className={item.color} />
            </div>

            <h2 className="text-3xl font-extrabold text-black">{item.value}</h2>
            <p className="mt-1 text-xs font-bold text-orange-500">
              {item.note}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;