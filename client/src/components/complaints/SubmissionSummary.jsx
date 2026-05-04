import { CheckCircle } from "lucide-react";

const SubmissionSummary = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-gray-900">
        Submission Summary
      </h3>

      <div className="space-y-3">
        <SummaryRow label="Predicted Category" value="Sanitation" />
        <SummaryRow label="Priority Level" badge="High Priority" color="red" />
        <SummaryRow label="Tracking ID" value="AGRV-542-124" />
        <SummaryRow
          label="Initial Status"
          badge="Pending Analysis"
          color="orange"
        />
      </div>

      <div className="mt-5 flex gap-3 rounded-md bg-green-50 p-3">
        <CheckCircle size={18} className="mt-0.5 text-green-600" />
        <p className="text-sm text-gray-600">
          Direct routing to the Municipal Waste Department has been initiated.
        </p>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, badge, color }) => {
  const badgeColor =
    color === "red"
      ? "bg-red-100 text-red-500"
      : "bg-orange-100 text-orange-500";

  return (
    <div className="flex items-center justify-between rounded-md bg-gray-50 px-4 py-3">
      <span className="text-sm text-gray-500">{label}</span>

      {badge ? (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}>
          {badge}
        </span>
      ) : (
        <span className="text-sm font-semibold text-gray-900">{value}</span>
      )}
    </div>
  );
};

export default SubmissionSummary;