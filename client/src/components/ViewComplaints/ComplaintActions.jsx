import { Pencil, Trash2, Loader2 } from "lucide-react";

const ComplaintActions = ({
  onEdit,
  onDelete,
  deleteLoading,
  statusLoading,
}) => {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        onClick={onEdit}
        disabled={deleteLoading || statusLoading}
        className="rounded-lg border border-blue-100 bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
        title="Edit"
      >
        <Pencil size={15} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={deleteLoading || statusLoading}
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
  );
};

export default ComplaintActions;