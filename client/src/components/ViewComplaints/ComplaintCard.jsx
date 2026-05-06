import {
  MapPin,
  Phone,
  User,
  CalendarDays,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteComplaintService } from "../../services/complaintService";

const ComplaintCard = ({ data, onDeleted }) => {
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const statusStyle = {
    pending: "bg-orange-100 text-orange-700 border-orange-200",
    "in progress": "bg-blue-100 text-blue-700 border-blue-200",
    resolved: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  const priorityStyle = {
    urgent: "bg-red-100 text-red-700 border-red-200",
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
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

  const handleEdit = () => {
    navigate("/submit", {
      state: {
        editMode: true,
        complaint: data,
      },
    });
  };

  const handleDelete = async () => {

    try {
      setDeleteLoading(true);

      const res = await deleteComplaintService({
        formData: {
          id: data?._id,
        },
      });

      if (res?.success && onDeleted) {
        await onDeleted();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-bold leading-6 text-gray-900">
            {data?.problem || "No problem"}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Complaint ID: {data?._id?.slice(-6)?.toUpperCase() || "N/A"}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handleEdit}
            disabled={deleteLoading}
            className="rounded-lg border border-blue-100 bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            title="Edit"
          >
            <Pencil size={15} />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="rounded-lg border border-red-100 bg-red-50 p-2 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            title="Delete"
          >
            {deleteLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Trash2 size={15} />
            )}
          </button>
        </div>
      </div>

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

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
            priorityStyle[priority] ||
            "border-gray-200 bg-gray-100 text-gray-600"
          }`}
        >
          {data?.priority || "medium"}
        </span>

        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
            statusStyle[status] || "border-gray-200 bg-gray-100 text-gray-600"
          }`}
        >
          {data?.status || "pending"}
        </span>
      </div>
    </div>
  );
};

export default ComplaintCard;