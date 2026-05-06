import { MapPin, Phone, User } from "lucide-react";
import VoiceInput from "./VoiceInput";
import DetectResult from "./DetectResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComplaintService,
  updateComplaintService,
} from "../../services/complaintService";
import { useLocation, useNavigate } from "react-router-dom";
import { detectComplaintService } from "../../services/detectComplaintService";
import {
  setSubmissionSummary,
  clearSubmissionSummary,
} from "../../features/submissionSummarySlice";

const ComplaintForm = () => {
  const userdata = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const editMode = location.state?.editMode || false;
  const editComplaint = location.state?.complaint || null;

  const [loading, setLoading] = useState(false);
  const [detectLoading, setDetectLoading] = useState(false);
  const [detectedData, setDetectedData] = useState(null);

  const [formData, setFormData] = useState({
    mobile: "",
    area: "",
    problem: "",
  });

  useEffect(() => {
    if (editMode && editComplaint) {
      setFormData({
        mobile: editComplaint?.mobile || "",
        area: editComplaint?.area || "",
        problem: editComplaint?.problem || "",
      });

      dispatch(
        setSubmissionSummary({
          category: editComplaint?.category || "",
          priority: editComplaint?.priority || "",
          trackingId: editComplaint?._id
            ? `AGRV-${editComplaint._id.slice(-6).toUpperCase()}`
            : "",
          status: editComplaint?.status || "",
        }),
      );

      return;
    }

    if (userdata) {
      setFormData((prev) => ({
        ...prev,
        mobile: userdata?.mobile || "",
        area: userdata?.address || "",
      }));
    }

    dispatch(clearSubmissionSummary());
  }, [userdata, editMode, editComplaint, dispatch]);

  useEffect(() => {
    if (editMode) return;

    if (!formData.problem.trim()) {
      setDetectedData(null);
      dispatch(clearSubmissionSummary());
      setDetectLoading(false);
      return;
    }

    setDetectLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await detectComplaintService({
          problem: formData.problem,
        });

        if (res?.success) {
          setDetectedData(res?.data);

          dispatch(
            setSubmissionSummary({
              category: res?.data?.category || "",
              priority: res?.data?.priority || "",
              trackingId: "Not generated yet",
              status: "Pending Analysis",
            }),
          );
        }
      } catch (error) {
        console.log(error);
        setDetectedData(null);
        dispatch(clearSubmissionSummary());
      } finally {
        setDetectLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData.problem, editMode, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setDescription = (textUpdater) => {
    setFormData((prev) => ({
      ...prev,
      problem:
        typeof textUpdater === "function"
          ? textUpdater(prev.problem)
          : textUpdater,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let res;

      if (editMode) {
        res = await updateComplaintService({
          formData: {
            id: editComplaint?._id,
            problem: formData.problem,
            area: formData.area,
            mobile: formData.mobile,
          },
          dispatch,
        });
      } else {
        res = await createComplaintService({
          formData,
          dispatch,
        });
      }

      if (res?.success) {
        dispatch(
          setSubmissionSummary({
            category: res?.data?.category || detectedData?.category || "",
            priority: res?.data?.priority || detectedData?.priority || "",
            trackingId: res?.data?._id
              ? `AGRV-${res.data._id.slice(-6).toUpperCase()}`
              : "Generated",
            status: res?.data?.status || "pending",
          }),
        );

        navigate("/view-complaints");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {editMode ? "Update Complaint" : "Submit Complaint"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {editMode
            ? "Update your complaint details"
            : "Fill all complaint details properly"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
            Full Name
          </label>

          <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
            <User size={17} className="text-gray-400" />

            <input
              type="text"
              readOnly
              value={userdata?.name || editComplaint?.createdBy?.name || ""}
              className="ml-3 w-full bg-transparent text-sm font-medium text-gray-700 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
            Mobile Number
          </label>

          <div className="flex items-center rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-slate-400">
            <Phone size={17} className="text-gray-400" />

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="ml-3 w-full text-sm outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
          Area / Location
        </label>

        <div className="flex items-center rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-slate-400">
          <MapPin size={17} className="text-gray-400" />

          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter your area"
            className="ml-3 w-full text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Complaint Description
          </label>

          <VoiceInput setDescription={setDescription} />
        </div>

        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          rows="6"
          placeholder="Describe your issue..."
          className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
        />

        {!editMode && (
          <p className="mt-2 text-xs text-gray-400">
            AI automatically detects complaint category & priority
          </p>
        )}
      </div>

      {!editMode && (
        <DetectResult
          detectLoading={detectLoading}
          detectedData={detectedData}
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-2xl bg-slate-950 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? editMode
            ? "Updating..."
            : "Submitting..."
          : editMode
            ? "Update Complaint"
            : "Submit Complaint"}
      </button>
    </form>
  );
};

export default ComplaintForm;













// import { MapPin, Phone, User } from "lucide-react";
// import VoiceInput from "./VoiceInput";
// import DetectResult from "./DetectResult";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createComplaintService,
//   updateComplaintService,
// } from "../../services/complaintService";

// import { useLocation, useNavigate } from "react-router-dom";
// import { detectComplaintService } from "../../services/detectComplaintService";

// const ComplaintForm = () => {
//   const userdata = useSelector((state) => state.user.user);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const editMode = location.state?.editMode || false;
//   const editComplaint = location.state?.complaint || null;

//   const [loading, setLoading] = useState(false);
//   const [detectLoading, setDetectLoading] = useState(false);
//   const [detectedData, setDetectedData] = useState(null);

//   const [formData, setFormData] = useState({
//     mobile: "",
//     area: "",
//     problem: "",
//   });

//   // =========================
//   // Prefill Data
//   // =========================
//   useEffect(() => {
//     if (editMode && editComplaint) {
//       setFormData({
//         mobile: editComplaint?.mobile || "",
//         area: editComplaint?.area || "",
//         problem: editComplaint?.problem || "",
//       });

//       return;
//     }

//     if (userdata) {
//       setFormData((prev) => ({
//         ...prev,
//         mobile: userdata?.mobile || "",
//         area: userdata?.address || "",
//       }));
//     }
//   }, [userdata, editMode, editComplaint]);

//   // =========================
//   // Detect API
//   // =========================
//   useEffect(() => {
//     if (!formData.problem.trim()) {
//       setDetectedData(null);
//       setDetectLoading(false);
//       return;
//     }

//     setDetectLoading(true);

//     const timer = setTimeout(async () => {
//       try {
//         const res = await detectComplaintService({
//           problem: formData.problem,
//         });

//         if (res?.success) {
//           setDetectedData(res?.data);
//         }
//       } catch (error) {
//         console.log(error);
//         setDetectedData(null);
//       } finally {
//         setDetectLoading(false);
//       }
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, [formData.problem]);

//   // =========================
//   // Handle Change
//   // =========================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================
//   // Voice Input
//   // =========================
//   const setDescription = (textUpdater) => {
//     setFormData((prev) => ({
//       ...prev,
//       problem:
//         typeof textUpdater === "function"
//           ? textUpdater(prev.problem)
//           : textUpdater,
//     }));
//   };

//   // =========================
//   // Submit
//   // =========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       let res;

//       // =========================
//       // UPDATE
//       // =========================
//       if (editMode) {
//         res = await updateComplaintService({
//           formData: {
//             id: editComplaint?._id,
//             problem: formData.problem,
//             area: formData.area,
//             mobile: formData.mobile,
//           },
//           dispatch,
//         });
//       }

//       // =========================
//       // CREATE
//       // =========================
//       else {
//         res = await createComplaintService({
//           formData,
//           dispatch,
//         });
//       }

//       if (res?.success) {
//         navigate("/view-complaints");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
//     >
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">
//           {editMode ? "Update Complaint" : "Submit Complaint"}
//         </h2>

//         <p className="mt-1 text-sm text-gray-500">
//           {editMode
//             ? "Update your complaint details"
//             : "Fill all complaint details properly"}
//         </p>
//       </div>

//       {/* Inputs */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         {/* Name */}
//         <div>
//           <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
//             Full Name
//           </label>

//           <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
//             <User size={17} className="text-gray-400" />

//             <input
//               type="text"
//               readOnly
//               value={userdata?.name || ""}
//               className="ml-3 w-full bg-transparent text-sm font-medium text-gray-700 outline-none"
//             />
//           </div>
//         </div>

//         {/* Mobile */}
//         <div>
//           <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
//             Mobile Number
//           </label>

//           <div className="flex items-center rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-slate-400">
//             <Phone size={17} className="text-gray-400" />

//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               placeholder="Enter mobile number"
//               className="ml-3 w-full text-sm outline-none"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Area */}
//       <div className="mt-5">
//         <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
//           Area / Location
//         </label>

//         <div className="flex items-center rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-slate-400">
//           <MapPin size={17} className="text-gray-400" />

//           <input
//             type="text"
//             name="area"
//             value={formData.area}
//             onChange={handleChange}
//             placeholder="Enter your area"
//             className="ml-3 w-full text-sm outline-none"
//           />
//         </div>
//       </div>

//       {/* Problem */}
//       <div className="mt-5">
//         <div className="mb-2 flex items-center justify-between">
//           <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
//             Complaint Description
//           </label>

//           <VoiceInput setDescription={setDescription} />
//         </div>

//         <textarea
//           name="problem"
//           value={formData.problem}
//           onChange={handleChange}
//           rows="6"
//           placeholder="Describe your issue..."
//           className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
//         />

//         <p className="mt-2 text-xs text-gray-400">
//           AI automatically detects complaint category & priority
//         </p>
//       </div>

//       {/* Detect Result */}
//       <DetectResult detectLoading={detectLoading} detectedData={detectedData} />

//       {/* Submit */}
//       <button
//         type="submit"
//         disabled={loading}
//         className="mt-6 w-full rounded-2xl bg-slate-950 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {loading
//           ? editMode
//             ? "Updating..."
//             : "Submitting..."
//           : editMode
//             ? "Update Complaint"
//             : "Submit Complaint"}
//       </button>
//     </form>
//   );
// };

// export default ComplaintForm;
