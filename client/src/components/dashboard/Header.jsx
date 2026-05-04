import { Calendar} from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black">
          System Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Real-time monitoring of civic grievances and resolution efficiency.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300">
          <Calendar size={14} />
          Last 30 Days
        </button>

     
      </div>
    </motion.div>
  );
};

export default Header;