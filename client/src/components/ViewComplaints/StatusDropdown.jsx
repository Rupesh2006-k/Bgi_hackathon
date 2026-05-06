import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

const StatusDropdown = ({
  status,
  statusStyle,
  statusLoading,
  deleteLoading,
  onStatusChange,
}) => {
  const [statusOpen, setStatusOpen] = useState(false);

  const statusOptions = ["pending", "resolved", "rejected"];

  const handleChange = async (newStatus) => {
    setStatusOpen(false);

    if (newStatus === status) return;

    await onStatusChange(newStatus);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setStatusOpen((prev) => !prev)}
        disabled={statusLoading || deleteLoading}
        className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-50 ${
          statusStyle[status] || "border-gray-200 bg-gray-100 text-gray-600"
        }`}
      >
        {statusLoading ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <>
            {status}
            <ChevronDown size={12} />
          </>
        )}
      </button>

      {statusOpen && (
        <div className="absolute right-0 top-8 z-50 w-32 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {statusOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleChange(item)}
              className={`block w-full px-4 py-2 text-left text-xs font-semibold capitalize transition hover:bg-gray-100 ${
                item === status ? "bg-gray-50 text-blue-600" : "text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;