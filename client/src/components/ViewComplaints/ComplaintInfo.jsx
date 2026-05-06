import { MapPin, Phone, User, CalendarDays } from "lucide-react";

const ComplaintInfo = ({ data }) => {
  const formatDate = (date) => {
    if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
      <p className="flex items-center gap-2">
        <User size={14} className="text-gray-400" />
        {data?.createdBy?.name || "Unknown User"}
      </p>

      <p className="flex items-center gap-2">
        <Phone size={14} className="text-gray-400" />
        {data?.mobile || "No mobile"}
      </p>

      <p className="flex items-center gap-2">
        <MapPin size={14} className="text-gray-400" />
        {data?.area || "No area"}
      </p>

      <p className="flex items-center gap-2">
        <CalendarDays size={14} className="text-gray-400" />
        {formatDate(data?.createdAt)}
      </p>
    </div>
  );
};

export default ComplaintInfo;
