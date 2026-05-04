import { useState } from "react";
import ManagementHeader from "../components/Management/ManagementHeader";
import ManagementFilters from "../components/Management/ManagementFilters";
import ComplaintTable from "../components/Management/ComplaintTable";

const complaints = [
  {
    title: "Street light failure at Main ...",
    desc: "Electrical pole #42 is flickering...",
    area: "Downtown Sector 4",
    mobile: "+1 555-0101",
    category: "Infrastructure",
    priority: "High",
    status: "Pending",
    date: "Oct 24, 2023",
  },
  {
    title: "Garbage overflow near park",
    desc: "Trash collection missed twice...",
    area: "Riverside Heights",
    mobile: "+1 555-0199",
    category: "Sanitation",
    priority: "Medium",
    status: "In Progress",
    date: "Oct 23, 2023",
  },
  {
    title: "Pot hole on Highway 9",
    desc: "Large gap causing traffic jams...",
    area: "Outer Beltway",
    mobile: "+1 555-0245",
    category: "Public Works",
    priority: "High",
    status: "Resolved",
    date: "Oct 22, 2023",
  },
  {
    title: "Water leakage at Plaza",
    desc: "Main pipe leak reported by guard...",
    area: "Central Plaza",
    mobile: "+1 555-0312",
    category: "Water Supply",
    priority: "Medium",
    status: "Pending",
    date: "Oct 22, 2023",
  },
  {
    title: "Park bench vandalized",
    desc: "Graffiti on multiple benches...",
    area: "Greenway Park",
    mobile: "+1 555-0442",
    category: "Public Safety",
    priority: "Low",
    status: "In Progress",
    date: "Oct 21, 2023",
  },
];

const Management = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    status: "",
  });

  const filteredComplaints = complaints.filter((item) => {
    const searchValue = filters.search.toLowerCase();

    const matchSearch =
      item.area.toLowerCase().includes(searchValue) ||
      item.mobile.toLowerCase().includes(searchValue);

    const matchCategory = filters.category
      ? item.category === filters.category
      : true;

    const matchPriority = filters.priority
      ? item.priority === filters.priority
      : true;

    const matchStatus = filters.status ? item.status === filters.status : true;

    return matchSearch && matchCategory && matchPriority && matchStatus;
  });

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <ManagementHeader />

        <ManagementFilters filters={filters} setFilters={setFilters} />

        <ComplaintTable complaints={filteredComplaints} />
      </div>
    </div>
  );
};

export default Management;
