import ComplaintRow from "./ComplaintRow";
import TablePagination from "./TablePagination";

const ComplaintTable = ({ complaints }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
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
                  className="px-8 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-slate-400"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {complaints.map((item, index) => (
              <ComplaintRow key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination />
    </div>
  );
};

export default ComplaintTable;
