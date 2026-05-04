import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData?.name || "",
        email: userData?.email || "",
        mobile: userData?.mobile || "",
        address: userData?.address || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await updateProfileService(formData, dispatch);
      console.log(res);

      if (res?.success) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={goBack}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-2xl font-bold text-gray-900">Update Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal details here.
        </p>

        <form onSubmit={handleUpdate} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="h-11 w-full rounded-md border border-orange-200 bg-orange-50 px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="h-11 w-full rounded-md border border-orange-200 bg-orange-50 px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500"
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
              placeholder="Enter your mobile number"
              className="h-11 w-full rounded-md border border-orange-200 bg-orange-50 px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows={4}
              className="w-full resize-none rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-md bg-black font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
