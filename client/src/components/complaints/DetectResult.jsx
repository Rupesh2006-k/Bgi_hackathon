import { AlertTriangle, CheckCircle2, Loader2, Tags } from "lucide-react";

const DetectResult = ({ detectLoading, detectedData }) => {
  const priorityStyle = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div className="mt-5">
      {detectLoading && (
        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <Loader2 size={20} className="animate-spin text-blue-600" />

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Detecting issue...
            </p>
            <p className="text-xs text-gray-500">
              Analyzing category and priority
            </p>
          </div>
        </div>
      )}

      {detectedData && !detectLoading && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-600" />
            <h3 className="text-sm font-semibold text-gray-800">
              Detection Completed
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <Tags size={16} className="text-blue-600" />
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Category
                </p>
              </div>

              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold capitalize text-blue-700">
                {detectedData.category || "other"}
              </span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-orange-600" />
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Priority
                </p>
              </div>

              <span
                className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold capitalize ${
                  priorityStyle[detectedData.priority] || priorityStyle.low
                }`}
              >
                {detectedData.priority || "low"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectResult;
