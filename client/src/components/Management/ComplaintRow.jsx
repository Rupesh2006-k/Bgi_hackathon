const priorityStyle = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-300",
  Low: "bg-green-100 text-green-600",
};

const statusStyle = {
  Pending: "bg-orange-50 text-orange-600 border border-orange-200",
  "In Progress": "bg-blue-50 text-blue-600 border border-blue-200",
  Resolved: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  Rejected: "bg-red-50 text-red-600 border border-red-200",
};

const ComplaintRow = ({ item }) => {
  return (
    <tr className="border-b border-gray-100 last:border-b-0">
      <td className="px-8 py-5">
        <h3 className="text-sm font-semibold text-slate-700">{item.title}</h3>
        <p className="mt-1 text-xs font-semibold text-slate-400">{item.desc}</p>
      </td>

      <td className="px-8 py-5 text-sm font-semibold text-slate-500">
        {item.area}
      </td>

      <td className="px-8 py-5 text-sm font-semibold text-slate-400">
        {item.mobile}
      </td>

      <td className="px-8 py-5">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {item.category}
        </span>
      </td>

      <td className="px-8 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityStyle[item.priority]
          }`}
        >
          {item.priority}
        </span>
      </td>

      <td className="px-8 py-5">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyle[item.status]
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {item.status}
        </span>
      </td>

      <td className="px-8 py-5 text-sm font-semibold text-slate-400">
        {item.date}
      </td>
    </tr>
  );
};

export default ComplaintRow;
