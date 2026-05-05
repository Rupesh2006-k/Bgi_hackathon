import { MapPin, Phone, User } from "lucide-react";
import VoiceInput from "./VoiceInput";
import DetectResult from "./DetectResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComplaintService } from "../../services/complaintService";
import { useNavigate } from "react-router-dom";
import { detectComplaintService } from "../../services/detectComplaintService";

const ComplaintForm = () => {
  const userdata = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [detectLoading, setDetectLoading] = useState(false);
  const [detectedData, setDetectedData] = useState(null);

  const [formData, setFormData] = useState({
    mobile: "",
    area: "",
    problem: "",
  });

  useEffect(() => {
    if (userdata) {
      setFormData((prev) => ({
        ...prev,
        mobile: userdata?.mobile || "",
        area: userdata?.address || "",
      }));
    }
  }, [userdata]);

  useEffect(() => {
    if (!formData.problem.trim()) {
      setDetectedData(null);
      setDetectLoading(false);
      return;
    }

    setDetectedData(null);
    setDetectLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await detectComplaintService(formData.problem);

        if (res?.success) {
          setDetectedData(res.data);
        }
      } catch (error) {
        console.log(error);
        setDetectedData(null);
      } finally {
        setDetectLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      setDetectLoading(false);
    };
  }, [formData.problem]);

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

      const res = await createComplaintService({ formData, dispatch });

      if (res.success) {
        navigate("/view-complaints");

        setFormData({
          mobile: userdata?.mobile || "",
          area: userdata?.address || "",
          problem: "",
        });

        setDetectedData(null);
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
      className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Submit Complaint
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Fill the details below. Your issue category and priority will be
          detected automatically.
        </p>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
            Full Name
          </label>

          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <User size={17} className="shrink-0 text-gray-400" />
            <input
              type="text"
              name="name"
              value={userdata?.name || ""}
              readOnly
              placeholder="Your name"
              className="ml-3 w-full bg-transparent text-sm font-medium text-gray-700 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
            Mobile Number
          </label>

          <div className="flex items-center rounded-xl border border-gray-200 px-4 py-3 transition focus-within:border-slate-400">
            <Phone size={17} className="shrink-0 text-gray-400" />
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

      {/* Location */}
      <div className="mt-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
          Area / Location
        </label>

        <div className="flex items-center rounded-xl border border-gray-200 px-4 py-3 transition focus-within:border-slate-400">
          <MapPin size={17} className="shrink-0 text-gray-400" />
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter street, area or landmark"
            className="ml-3 w-full text-sm outline-none"
          />
        </div>
      </div>

      {/* Problem */}
      <div className="mt-5">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
          placeholder="Example: Sadak me bada gaddha hai 3 din se..."
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-slate-400"
        />

        <p className="mt-2 text-xs text-gray-400">
          Category and priority will be detected after 5 seconds.
        </p>
      </div>

      {/* Detect Result */}
      <DetectResult detectLoading={detectLoading} detectedData={detectedData} />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-slate-950 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Grievance"}
      </button>
    </form>
  );
};

export default ComplaintForm;