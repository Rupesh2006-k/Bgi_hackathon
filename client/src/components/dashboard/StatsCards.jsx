import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getDashboardStatsService } from "../../services/complaintService";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData } from "../../features/dashboardSlice";

const StatsCards = () => {
  const dispatch = useDispatch();

  const dashboardData = useSelector((state) => state.dashboard);

  const [loading, setLoading] = useState(false);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const res = await getDashboardStatsService();

      if (res?.success) {
        dispatch(setDashboardData(res.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const stats = [
    {
      title: "TOTAL",
      value: dashboardData?.totalComplaints || 0,
      note: "Total complaints",
      icon: Clock,
      color: "text-black",
    },
    {
      title: "PENDING",
      value: dashboardData?.pendingIssues || 0,
      note: "Needs attention",
      icon: Clock,
      color: "text-orange-500",
    },
    {
      title: "RESOLVED",
      value: dashboardData?.resolvedIssues || 0,
      note: "Successfully resolved",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "REJECTED",
      value: dashboardData?.rejectedIssues || 0,
      note: "Rejected issues",
      icon: XCircle,
      color: "text-red-600",
    },
    {
      title: "CRITICAL",
      value: dashboardData?.highPriorityIssues || 0,
      note: "Immediate action",
      icon: AlertTriangle,
      color: "text-red-600",
      danger: true,
    },
  ];

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

            <h2 className="text-3xl font-extrabold text-black">
              {loading ? "..." : item.value}
            </h2>

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

// import { useEffect, useState } from "react";
// import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
// import { motion } from "framer-motion";
// import { getDashboardStatsService } from "../../services/complaintService";
// import { useDispatch, useSelector } from "react-redux";
// import { setDashboardData } from "../../features/dashboardSlice";
// const StatsCards = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalComplaints: 0,
//     pendingIssues: 0,
//     resolvedIssues: 0,
//     rejectedIssues: 0,
//     highPriorityIssues: 0,
//   });
//   const dashboard = useSelector((state) => state.dashboard);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const fetchDashboardStats = async () => {
//     try {
//       setLoading(true);

//       const res = await getDashboardStatsService();
//       console.log("====================================");
//       console.log(res);
//       console.log("====================================");
//       if (res?.success) {
//         dispatch(setDashboardData(res.data));
//       }
//       if (res?.success) {
//         setDashboardData(res.data);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardStats();
//   }, []);
//   console.log("dashboard", dashboard);

//   const stats = [
//     {
//       title: "TOTAL",
//       value: dashboardData?.totalComplaints || 0,
//       note: "Total complaints",
//       icon: Clock,
//       color: "text-black",
//     },
//     {
//       title: "PENDING",
//       value: dashboardData?.pendingIssues || 0,
//       note: "Needs attention",
//       icon: Clock,
//       color: "text-orange-500",
//     },
//     {
//       title: "RESOLVED",
//       value: dashboardData?.resolvedIssues || 0,
//       note: "Successfully resolved",
//       icon: CheckCircle,
//       color: "text-emerald-600",
//     },
//     {
//       title: "REJECTED",
//       value: dashboardData?.rejectedIssues || 0,
//       note: "Rejected issues",
//       icon: XCircle,
//       color: "text-red-600",
//     },
//     {
//       title: "CRITICAL",
//       value: dashboardData?.highPriorityIssues || 0,
//       note: "Immediate action",
//       icon: AlertTriangle,
//       color: "text-red-600",
//       danger: true,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//       {stats.map((item, index) => {
//         const Icon = item.icon;

//         return (
//           <motion.div
//             key={item.title}
//             initial={{ opacity: 0, y: 22 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.08 }}
//             whileHover={{ y: -6, scale: 1.02 }}
//             className={`rounded-xl border bg-white p-5 shadow-sm transition ${
//               item.danger ? "border-orange-500" : "border-gray-200"
//             }`}
//           >
//             <div className="mb-4 flex items-center justify-between">
//               <p className="text-xs font-extrabold text-gray-400">
//                 {item.title}
//               </p>
//               <Icon size={16} className={item.color} />
//             </div>

//             <h2 className="text-3xl font-extrabold text-black">
//               {loading ? "..." : item.value}
//             </h2>

//             <p className="mt-1 text-xs font-bold text-orange-500">
//               {item.note}
//             </p>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// export default StatsCards;
