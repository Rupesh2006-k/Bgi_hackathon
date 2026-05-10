import { useEffect } from "react";
import ComplaintCard from "../components/ViewComplaints/ComplaintCard";
import { setComplaints } from "../features/complaintSlice";
import { getAllComplaintService } from "../services/complaintService";
import { useDispatch, useSelector } from "react-redux";

const ViewComplaints = () => {
  const dispatch = useDispatch();

  const complaints = useSelector((state) => state.complaint.complaints);
  const user = useSelector((state) => state.user.user);

  const isAdmin = user?.role === "admin";

  const fetchComplaints = async () => {
    try {
      const res = await getAllComplaintService();
      const allComplaints = res?.data || [];

      const filteredComplaints = isAdmin
        ? allComplaints
        : allComplaints.filter(
            (item) => item?.createdBy?._id === user?._id
          );

      dispatch(setComplaints(filteredComplaints));
    } catch (error) {
      console.log("Complaint fetch error:", error);
      dispatch(setComplaints([]));
    }
  };

  useEffect(() => {
    if (user?._id) fetchComplaints();
  }, [user?._id, user?.role]);

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-xl font-bold text-gray-900">
          {isAdmin ? "All Complaints" : "My Complaints"}
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {complaints?.length > 0 ? (
            complaints.map((item) => (
              <ComplaintCard
                key={item._id}
                data={item}
                user={user}
                onDeleted={fetchComplaints}
                onStatusUpdated={fetchComplaints}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No complaints found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewComplaints;
