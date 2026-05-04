import { MapPin, Phone, User, CalendarDays } from "lucide-react";

const ComplaintCard = ({ data }) => {
  const statusStyle = {
    pending: "bg-orange-100 text-orange-600",
    "in progress": "bg-blue-100 text-blue-600",
    resolved: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
  };

  const priorityStyle = {
    urgent: "bg-red-100 text-red-600",
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };

  const formatDate = (date) => {
    if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const priority = data?.priority?.toLowerCase();
  const status = data?.status?.toLowerCase();

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 hover:shadow-md transition">
      {/* Title */}
      <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
        {data?.problem || "No problem"}
      </h3>

      {/* User Info */}
      <div className="mt-3 space-y-1 text-xs text-gray-500">
        <p className="flex items-center gap-2">
          <User size={14} /> {data?.createdBy?.name || "Unknown User"}
        </p>

        <p className="flex items-center gap-2">
          <Phone size={14} /> {data?.mobile || "No mobile"}
        </p>

        <p className="flex items-center gap-2">
          <MapPin size={14} /> {data?.area || "No area"}
        </p>

        <p className="flex items-center gap-2">
          <CalendarDays size={14} /> {formatDate(data?.createdAt)}
        </p>
      </div>

      {/* Badges */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
            priorityStyle[priority] || "bg-gray-100 text-gray-600"
          }`}
        >
          {data?.priority || "medium"}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
            statusStyle[status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {data?.status || "pending"}
        </span>
      </div>
    </div>
  );
};

export default ComplaintCard;
