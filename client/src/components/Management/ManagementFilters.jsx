import { Search } from "lucide-react";
import CustomDropdown from "./CustomDropdown";

const ManagementFilters = ({ filters, setFilters }) => {
  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.8fr_0.7fr_0.7fr_0.7fr_auto]">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Search title, area or mobile number..."
            className="w-full bg-transparent text-sm font-semibold text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <CustomDropdown
          label="Category"
          value={filters.category}
          options={[
            "Water Supply",
            "Sanitation",
            "Infrastructure",
            "Public Works",
            "Public Safety",
          ]}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, category: value }))
          }
        />

        <CustomDropdown
          label="Priority"
          value={filters.priority}
          options={["High", "Medium", "Low"]}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, priority: value }))
          }
        />

        <CustomDropdown
          label="Status"
          value={filters.status}
          options={["Pending", "In Progress", "Resolved", "Rejected"]}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, status: value }))
          }
        />

        <button
          type="button"
          className="rounded-lg bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ManagementFilters;
