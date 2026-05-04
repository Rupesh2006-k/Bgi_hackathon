import DepartmentChart from "../components/dashboard/DepartmentChart";
import Header from "../components/dashboard/Header";
import PriorityChart from "../components/dashboard/PriorityChart";
import RecentGrievances from "../components/dashboard/RecentGrievances";
import StatsCards from "../components/dashboard/StatsCards";
import TrendChart from "../components/dashboard/TrendChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8f7f5] p-4 text-black md:p-8">
      <div className="mx-auto max-w-7xl">
        <Header />

        <StatsCards />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <DepartmentChart />
          <PriorityChart />
        </div>

        <TrendChart />

        <RecentGrievances />
      </div>
    </div>
  );
};

export default Dashboard;
