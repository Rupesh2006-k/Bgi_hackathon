import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ComplaintActions from "./ComplaintActions";
import ComplaintInfo from "./ComplaintInfo";
import ComplaintBadges from "./ComplaintBadges";
import {
  deleteComplaintService,
  statusUpdateComplaintService,
} from "../../services/complaintService";

const ComplaintCard = ({ data, userRole, onDeleted, onStatusUpdated }) => {
  const navigate = useNavigate();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

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

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusLoading(true);

      const res = await statusUpdateComplaintService({
        formData: {
          status: newStatus,
          id: data?._id,
        },
      });

      if (res?.success && onStatusUpdated) {
        await onStatusUpdated();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStatusLoading(false);
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

        <ComplaintActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleteLoading={deleteLoading}
          statusLoading={statusLoading}
        />
      </div>

      <ComplaintInfo data={data} />

      <ComplaintBadges
        priority={data?.priority}
        status={data?.status}
        userRole={userRole}
        statusLoading={statusLoading}
        deleteLoading={deleteLoading}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default ComplaintCard;
