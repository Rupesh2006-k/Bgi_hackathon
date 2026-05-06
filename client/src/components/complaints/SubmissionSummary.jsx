import { CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";

const SubmissionSummary = () => {
  const { category, priority, trackingId, status } = useSelector(
    (state) => state.submissionSummary
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-gray-900">
        Submission Summary
      </h3>

      <div className="space-y-3">
        <SummaryRow
          label="Predicted Category"
          value={category || "Not detected yet"}
        />

        <SummaryRow
          label="Priority Level"
          badge={priority ? `${priority} Priority` : "Not detected yet"}
          color={priority}
        />

        <SummaryRow
          label="Tracking ID"
          value={trackingId || "Not generated yet"}
        />

        <SummaryRow
          label="Initial Status"
          badge={status || "Pending Analysis"}
          color="orange"
        />
      </div>

      <div className="mt-5 flex gap-3 rounded-md bg-green-50 p-3">
        <CheckCircle size={18} className="mt-0.5 text-green-600" />
        <p className="text-sm text-gray-600">
          Direct routing to the Municipal Department will be initiated after
          submission.
        </p>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, badge, color }) => {
  const badgeColor =
    color === "high"
      ? "bg-red-100 text-red-600"
      : color === "medium"
      ? "bg-yellow-100 text-yellow-600"
      : color === "low"
      ? "bg-green-100 text-green-600"
      : "bg-orange-100 text-orange-500";

  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-gray-50 px-4 py-3">
      <span className="text-sm text-gray-500">{label}</span>

      {badge ? (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeColor}`}
        >
          {badge}
        </span>
      ) : (
        <span className="text-right text-sm font-semibold capitalize text-gray-900">
          {value}
        </span>
      )}
    </div>
  );
};

export default SubmissionSummary;
