import ComplaintCard from "../components/ViewComplaints/ComplaintCard";

const complaints = [
  {
    id: 1,
    title: "Water leakage on main road",
    name: "Rahul Sharma",
    mobile: "+91 9876543210",
    area: "Bhopal",
    date: "12 Jan 2026",
    priority: "Urgent",
    status: "Pending",
  },
  {
    id: 2,
    title: "Garbage not collected",
    name: "Amit Verma",
    mobile: "+91 9876543211",
    area: "Indore",
    date: "10 Jan 2026",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Street light not working",
    name: "Neha Singh",
    mobile: "+91 9876543212",
    area: "Delhi",
    date: "09 Jan 2026",
    priority: "High",
    status: "Pending",
  },
  {
    id: 4,
    title: "Road pothole issue",
    name: "Vikas Yadav",
    mobile: "+91 9876543213",
    area: "Lucknow",
    date: "08 Jan 2026",
    priority: "High",
    status: "Resolved",
  },
  {
    id: 5,
    title: "Water supply disruption",
    name: "Priya Gupta",
    mobile: "+91 9876543214",
    area: "Jaipur",
    date: "07 Jan 2026",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Park area cleanliness issue",
    name: "Rohit Kumar",
    mobile: "+91 9876543215",
    area: "Patna",
    date: "06 Jan 2026",
    priority: "Low",
    status: "Pending",
  },
];
const ViewComplaints = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          User Complaints
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {complaints.map((item) => (
            <ComplaintCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewComplaints;
