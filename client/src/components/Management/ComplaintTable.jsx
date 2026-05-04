import ComplaintRow from "./ComplaintRow";
import TablePagination from "./TablePagination";

const ComplaintTable = ({
  complaints = [],
  totalItems = 0,
  currentPage = 1,
  totalPages = 0,
  itemsPerPage = 10,
  onPageChange,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {[
                "Complaint",
                "Area",
                "Mobile",
                "Category",
                "Priority",
                "Status",
                "Date",
              ].map((head) => (
                <th
                  key={head}
                  className="whitespace-nowrap px-3 py-4 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:px-5 sm:text-[11px] lg:px-8 lg:py-5 lg:text-xs"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {complaints.length > 0 ? (
              complaints.map((item, index) => (
                <ComplaintRow key={index} item={item} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="whitespace-nowrap px-8 py-10 text-center text-sm font-semibold text-slate-400"
                >
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        totalItems={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ComplaintTable;
