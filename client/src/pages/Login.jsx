import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    try {
      setLoading(true);

      const res = await loginService(formData, dispatch); // ✅ correct

      // ✅ success check
      if (res?.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-orange-200 overflow-hidden">
        <div className="text-center px-8 py-8">
          <div className="mx-auto w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-black">Welcome Back</h1>

          <p className="text-sm text-gray-500 mt-2">
            Sign in to manage and track grievances.
          </p>
        </div>

        <div className="border-t border-orange-100" />

        <div className="px-8 py-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Email Address
              </label>
              <input
                name="email"
                value={formData.email}
                type="email"
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full h-11 px-4 rounded-md border border-orange-200 bg-orange-50 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-gray-500 uppercase">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-orange-500 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <input
                name="password"
                value={formData.password}
                type="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-11 px-4 rounded-md border border-orange-200 bg-orange-50 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full h-12 bg-black text-white rounded-md font-semibold hover:bg-orange-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="bg-orange-50 px-8 py-6 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
