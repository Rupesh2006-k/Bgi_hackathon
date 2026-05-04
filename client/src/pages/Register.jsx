import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerService } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await registerService(formData, dispatch);

      if (res?.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Register Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-100 to-white px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-orange-200 bg-white shadow-xl">
        <div className="px-8 py-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-black">Create Account</h1>

          <p className="mt-2 text-sm text-gray-500">
            Join NagarMitra to submit and track grievances
          </p>
        </div>

        <div className="border-t border-orange-100" />

        <div className="px-8 py-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className="h-11 w-full rounded-md border border-orange-200 bg-orange-50 px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
                Email Address
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email address"
                className="h-11 w-full rounded-md border border-orange-200 bg-orange-50 px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                className="h-11 w-full rounded-md border border-orange-200 bg-orange-50 px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1"
              />
              <span>I agree to the terms and conditions</span>
            </label>

            <button
              type="submit"
              disabled={loading || !formData.terms}
              className="h-12 w-full rounded-md bg-black font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>

        <div className="bg-orange-50 px-8 py-6 text-center">
          <p className="text-sm font-medium text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-orange-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
