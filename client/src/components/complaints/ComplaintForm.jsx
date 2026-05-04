import { Camera, MapPin } from "lucide-react";
import VoiceInput from "./VoiceInput";
import { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    location: "",
    description: "",
  });

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
      description:
        typeof textUpdater === "function"
          ? textUpdater(prev.description)
          : textUpdater,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Form Data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-xl font-bold text-gray-900">Complaint Details</h2>
      <p className="mt-1 text-sm text-gray-500">
        Please provide accurate information for faster resolution.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
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
            name="mobileNumber"
            value={formData.mobileNumber}
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
          <MapPin size={16} className="text-gray-400" />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter street or landmark"
            className="ml-2 w-full text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-semibold uppercase text-gray-500">
            Complaint Description
          </label>

          <VoiceInput setDescription={setDescription} />
        </div>

        <textarea
          name="description"
          value={formData.description}
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
          <p className="mt-2 text-sm font-medium text-gray-400">
            Tap to capture or upload an image
          </p>
          <p className="text-xs text-gray-300">PNG, JPG up to 10MB</p>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Submit Grievance
      </button>
    </form>
  );
};

export default ComplaintForm;
