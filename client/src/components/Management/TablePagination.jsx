import { ChevronLeft, ChevronRight } from "lucide-react";

const TablePagination = () => {
  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-8 py-5 md:flex-row md:items-center md:justify-between">
      <p className="text-sm font-semibold text-slate-400">
        Showing 1-5 of 1,248 complaints
      </p>

      <div className="flex items-center gap-2">
        <button className="rounded-lg p-2 text-slate-300">
          <ChevronLeft size={18} />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              page === 1 ? "bg-slate-950 text-white" : "text-slate-500"
            }`}
          >
            {page}
          </button>
        ))}

        <span className="px-2 text-sm font-semibold text-slate-400">...</span>

        <button className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500">
          42
        </button>

        <button className="rounded-lg p-2 text-slate-400">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
