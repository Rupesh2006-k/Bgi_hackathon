import { ShieldCheck, Menu, X, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutService } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "./profile/ProfileDropdown";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userdata = useSelector((state) => state.user.user);
  const isLogin = userdata?._id || userdata?.email;

  // Default role = citizen
  const userRole = userdata?.role?.toLowerCase() || "citizen";

  // Role-based navigation
  const navLinks = [
    { name: "Home", path: "/" },

    ...(userRole === "citizen" || userRole === "admin"
      ? [{ name: "Submit Complaint", path: "/submit" }]
      : []),

    ...(userRole === "worker" || userRole === "admin"
      ? [{ name: "Dashboard", path: "/dashboard" }]
      : []),

    ...(userRole === "admin"
      ? [{ name: "Management", path: "/management" }]
      : []),

    ...(userRole === "citizen" || userRole === "worker" || userRole === "admin"
      ? [{ name: "View Complaints", path: "/view-complaints" }]
      : []),
  ];

  // Routes that require login
  const protectedPaths = [
    "/submit",
    "/dashboard",
    "/management",
    "/view-complaints",
  ];

  const handleNavClick = (e, path) => {
    if (!isLogin && protectedPaths.includes(path)) {
      e.preventDefault();
      setOpen(false);
      navigate("/login");
      return;
    }

    setOpen(false);
  };

  const handleLogout = async () => {
    await logoutService(dispatch);
    setProfileOpen(false);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky z-50 mx-auto w-full max-w-7xl">
      <div className="relative flex items-center justify-between rounded-2xl border border-orange-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:rounded-full md:px-6">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600">
            <ShieldCheck size={20} className="text-white" />
          </div>

          <span className="text-base font-bold text-black sm:text-lg">
            Nagar<span className="text-orange-500">Mitra</span>
            <span className="ml-1 text-xs text-gray-500">.AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-center gap-5 text-sm font-medium text-gray-600 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={({ isActive }) =>
                isActive
                  ? "whitespace-nowrap text-orange-500"
                  : "whitespace-nowrap transition hover:text-orange-500"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex shrink-0 items-center gap-2">
          {isLogin ? (
            <ProfileDropdown
              userdata={userdata}
              profileOpen={profileOpen}
              setProfileOpen={setProfileOpen}
              handleLogout={handleLogout}
            />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/login"
                className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="absolute left-0 top-[68px] z-40 w-full rounded-2xl border border-orange-100 bg-white p-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "transition hover:text-orange-500"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {!isLogin && (
              <div className="mt-2 grid grid-cols-2 gap-3 border-t pt-4">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-orange-200 px-4 py-2 text-center text-sm font-semibold text-orange-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            )}

            {isLogin && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex items-center gap-2 border-t pt-4 text-sm text-red-500"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
