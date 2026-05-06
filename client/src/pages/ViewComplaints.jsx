import { useEffect } from "react";
import ComplaintCard from "../components/ViewComplaints/ComplaintCard";
import { setComplaints } from "../features/complaintSlice";
import { getAllComplaintService } from "../services/complaintService";
import { useDispatch, useSelector } from "react-redux";

const ViewComplaints = () => {
  const dispatch = useDispatch();

  const complaints = useSelector((state) => state.complaint.complaints);

  const fetchComplaints = async () => {
    try {
      const res = await getAllComplaintService();
      console.log(res);

      // API response me data array aa raha hai
      dispatch(setComplaints(res?.data || []));
    } catch (error) {
      console.log("Complaint fetch error:", error);
      dispatch(setComplaints([]));
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  console.log("Complaints from Store:", complaints);

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          User Complaints
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {complaints?.length > 0 ? (
            complaints.map((item) => (
              <ComplaintCard key={item._id} data={item}  onDeleted={fetchComplaints} />
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
