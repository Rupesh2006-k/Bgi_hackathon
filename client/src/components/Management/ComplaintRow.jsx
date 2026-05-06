const priorityStyle = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-300",
  Low: "bg-green-100 text-green-600",
};

const statusStyle = {
  Pending: "bg-orange-50 text-orange-600 border border-orange-200",
  Resolved: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  Rejected: "bg-red-50 text-red-600 border border-red-200",
};

const ComplaintRow = ({ item }) => {
  return (
    <tr className="border-b border-gray-100 last:border-b-0">
      <td className="whitespace-nowrap px-3 py-4 sm:px-5 lg:px-8 lg:py-5">
        <h3 className="max-w-[170px] truncate text-[11px] font-semibold text-slate-700 sm:max-w-[220px] sm:text-xs lg:max-w-[280px] lg:text-sm">
          {item.title}
        </h3>

        <p className="mt-1 max-w-[170px] truncate text-[10px] font-semibold text-slate-400 sm:max-w-[220px] sm:text-[11px] lg:max-w-[280px] lg:text-xs">
          {item.desc}
        </p>
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-[10px] text-slate-500 sm:px-5 sm:text-xs lg:px-8 lg:py-5 lg:text-sm">
        {item.area}
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-[10px] text-slate-400 sm:px-5 sm:text-xs lg:px-8 lg:py-5 lg:text-sm">
        {item.mobile}
      </td>

      <td className="whitespace-nowrap px-3 py-4 sm:px-5 lg:px-8 lg:py-5">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 sm:px-3 sm:text-xs">
          {item.category}
        </span>
      </td>

      <td className="whitespace-nowrap px-3 py-4 sm:px-5 lg:px-8 lg:py-5">
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs ${
            priorityStyle[item.priority] || priorityStyle.Medium
          }`}
        >
          {item.priority}
        </span>
      </td>

      <td className="whitespace-nowrap px-3 py-4 sm:px-5 lg:px-8 lg:py-5">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold sm:gap-2 sm:px-3 sm:text-xs ${
            statusStyle[item.status] || statusStyle.Pending
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {item.status}
        </span>
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-[10px] text-slate-400 sm:px-5 sm:text-xs lg:px-8 lg:py-5 lg:text-sm">
        {item.date}
      </td>
    </tr>
  );
};

export default ComplaintRow;
