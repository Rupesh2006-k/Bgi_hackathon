import StatusDropdown from "./StatusDropdown";

const ComplaintBadges = ({
  priority,
  status,
  canUpdateStatus = false,
  statusLoading,
  deleteLoading,
  onStatusChange,
}) => {
  const currentPriority = priority?.toLowerCase() || "medium";
  const currentStatus = status?.toLowerCase() || "pending";

  const priorityStyle = {
    urgent: "bg-red-100 text-red-700 border-red-200",
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };

  const statusStyle = {
    pending: "bg-orange-100 text-orange-700 border-orange-200",
    resolved: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <span
        className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
          priorityStyle[currentPriority] ||
          "border-gray-200 bg-gray-100 text-gray-600"
        }`}
      >
        {priority || "medium"}
      </span>

      {canUpdateStatus ? (
        <StatusDropdown
          status={currentStatus}
          statusStyle={statusStyle}
          statusLoading={statusLoading}
          deleteLoading={deleteLoading}
          onStatusChange={onStatusChange}
        />
      ) : (
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
            statusStyle[currentStatus] ||
            "border-gray-200 bg-gray-100 text-gray-600"
          }`}
        >
          {status || "pending"}
        </span>
      )}
    </div>
  );
};

export default ComplaintBadges;
