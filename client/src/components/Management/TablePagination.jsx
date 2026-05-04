import { ChevronLeft, ChevronRight } from "lucide-react";

const TablePagination = ({
  totalItems,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-8 py-5 md:flex-row md:items-center md:justify-between">
      <p className="text-sm font-semibold text-slate-400">
        Showing {startItem}-{endItem} of {totalItems} complaints
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg p-2 text-slate-400 disabled:cursor-not-allowed disabled:text-slate-300"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              page === currentPage
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg p-2 text-slate-400 disabled:cursor-not-allowed disabled:text-slate-300"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
