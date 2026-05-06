import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ManagementHeader from "../components/Management/ManagementHeader";
import ManagementFilters from "../components/Management/ManagementFilters";
import ComplaintTable from "../components/Management/ComplaintTable";

import { getAllComplaintService } from "../services/complaintService";
import { setComplaints } from "../features/complaintSlice";

const ITEMS_PER_PAGE = 10;

const formatText = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const formatComplaint = (item) => {
  return {
    ...item,
    title: item.problem || "N/A",
    desc: item.trackingId || "No tracking ID",
    area: item.area || "N/A",
    mobile: item.mobile || "N/A",
    category: formatText(item.category || "other"),
    priority: formatText(item.priority || "medium"),
    status: formatText(item.status || "pending"),
    date: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A",
  };
};

const Management = () => {
  const dispatch = useDispatch();
  const complaints = useSelector((state) => state.complaint.complaints);

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await getAllComplaintService();

      if (res?.success) {
        dispatch(setComplaints(res.data || []));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleFilterChange = (callback) => {
    setFilters(callback);
    setCurrentPage(1);
  };

  const formattedComplaints = useMemo(() => {
    return (complaints || []).map(formatComplaint);
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return formattedComplaints.filter((item) => {
      const searchValue = filters.search.toLowerCase();

      const matchSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.area.toLowerCase().includes(searchValue) ||
        item.mobile.toLowerCase().includes(searchValue) ||
        item.desc.toLowerCase().includes(searchValue);

      const matchCategory = filters.category
        ? item.category === filters.category
        : true;

      const matchPriority = filters.priority
        ? item.priority === filters.priority
        : true;

      const matchStatus = filters.status
        ? item.status === filters.status
        : true;

      return matchSearch && matchCategory && matchPriority && matchStatus;
    });
  }, [formattedComplaints, filters]);

  const totalPages = Math.ceil(filteredComplaints.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedComplaints = filteredComplaints.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <ManagementHeader />

        <ManagementFilters filters={filters} setFilters={handleFilterChange} />

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-10 text-center text-sm font-semibold text-slate-400">
            Loading complaints...
          </div>
        ) : (
          <ComplaintTable
            complaints={paginatedComplaints}
            totalItems={filteredComplaints.length}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Management;