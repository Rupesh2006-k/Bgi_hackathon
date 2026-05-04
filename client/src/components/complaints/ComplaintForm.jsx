import { Camera, MapPin } from "lucide-react";
import VoiceInput from "./VoiceInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComplaintService } from "../../services/complaintService";
import { useNavigate } from "react-router-dom";
const ComplaintForm = () => {
  const userdata = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const naviagate = useNavigate();
  const [formData, setFormData] = useState({
    mobile: "",
    area: "",
    problem: "",
  });

  // ✅ userData reload ke baad aaye toh form auto fill ho
  useEffect(() => {
    if (userdata) {
      setFormData((prev) => ({
        ...prev,
        mobile: userdata?.mobile || "",
        area: userdata?.address || "",
      }));
    }
  }, [userdata]);

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
      console.log("Complaint Created:", res);
      if (res.data.data.success) {
        naviagate("/view-complaints");
        setFormData({
          mobile: userdata?.mobile || "",
          area: userdata?.address || "",
          problem: "",
        });
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
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
        Complaint Details
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Please provide accurate information for faster resolution.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={userdata?.name || ""}
            readOnly
            placeholder="John Doe"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
            Mobile Number
          </label>

          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
          Area / Location
        </label>

        <div className="flex items-center rounded-md border border-gray-200 px-4 py-3">
          <MapPin size={16} className="shrink-0 text-gray-400" />

          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter street or landmark"
            className="ml-2 w-full text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-xs font-semibold uppercase text-gray-500">
            Complaint / problem Description
          </label>

          <VoiceInput setDescription={setDescription} />
        </div>

        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          rows="6"
          placeholder="Describe the issue in detail..."
          className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
          Upload Photo (Optional)
        </label>

        <div className="flex h-36 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center">
          <Camera size={30} className="text-gray-400" />

          <p className="mt-2 px-3 text-sm font-medium text-gray-400">
            Tap to capture or upload an image
          </p>

          <p className="text-xs text-gray-300">PNG, JPG up to 10MB</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-md bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Grievance"}
      </button>
    </form>
  );
};

export default ComplaintForm;
