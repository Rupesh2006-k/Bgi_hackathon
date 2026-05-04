import { MapPin, Phone, User, CalendarDays } from "lucide-react";

const ComplaintCard = ({ data }) => {
  const statusStyle = {
    Pending: "bg-orange-100 text-orange-600",
    "In Progress": "bg-blue-100 text-blue-600",
    Resolved: "bg-green-100 text-green-600",
  };

  const priorityStyle = {
    Urgent: "bg-red-100 text-red-600",
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 hover:shadow-md transition">
      
      {/* Title */}
      <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
        {data.title}
      </h3>

      {/* User Info */}
      <div className="mt-3 space-y-1 text-xs text-gray-500">
        <p className="flex items-center gap-2">
          <User size={14} /> {data.name}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={14} /> {data.mobile}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={14} /> {data.area}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays size={14} /> {data.date}
        </p>
      </div>

      {/* Badges */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
            priorityStyle[data.priority]
          }`}
        >
          {data.priority}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
            statusStyle[data.status]
          }`}
        >
          {data.status}
        </span>
      </div>
    </div>
  );
};

export default ComplaintCard;