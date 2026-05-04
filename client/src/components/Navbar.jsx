
import { ShieldCheck, Menu, X, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutService } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userdata = useSelector((state) => state.user.user);
  const isLogin = userdata?._id || userdata?.email;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Submit Complaint", path: "/submit" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Management", path: "/management" },
    { name: "View Complaints", path: "/view-complaints" },
  ];

  const handleLogout = async () => {
    await logoutService(dispatch);
    setProfileOpen(false);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="relative mx-auto w-full max-w-7xl">
      <div className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:rounded-full md:px-6">
        
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600">
            <ShieldCheck size={20} className="text-white" />
          </div>

          <span className="text-base font-bold text-black sm:text-lg">
            Nagar<span className="text-orange-500">Mitra</span>
            <span className="ml-1 text-xs text-gray-500">.AI</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-5 text-sm font-medium text-gray-600 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
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

          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 top-[68px] z-40 w-full rounded-2xl border border-orange-100 bg-white p-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-orange-500" : "transition hover:text-orange-500"
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

// import { ShieldCheck, User, Menu, X, LogOut } from "lucide-react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { logoutService } from "../services/authService";
// import { useDispatch, useSelector } from "react-redux";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userdata = useSelector((state) => state.user.user);
//   const isLogin = userdata?._id || userdata?.email;
// console.log(userdata);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Submit Complaint", path: "/submit" },
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Management", path: "/management" },
//     { name: "View Complaints", path: "/view-complaints" },
//   ];

//   const handleLogout = async () => {
//     await logoutService(dispatch);
//     setProfileOpen(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="relative mx-auto w-full max-w-7xl">
//       <div className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:rounded-full md:px-6">
//         {/* Logo */}
//         <Link to="/" className="flex shrink-0 items-center gap-2.5">
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600">
//             <ShieldCheck size={20} className="text-white" />
//           </div>

//           <span className="text-base font-bold text-black sm:text-lg">
//             Nagar<span className="text-orange-500">Mitra</span>
//             <span className="ml-1 text-xs text-gray-500">.AI</span>
//           </span>
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden flex-1 items-center justify-center gap-5 text-sm font-medium text-gray-600 lg:flex">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 isActive
//                   ? "whitespace-nowrap text-orange-500"
//                   : "whitespace-nowrap transition hover:text-orange-500"
//               }
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </div>

//         {/* Right */}
//         <div className="flex shrink-0 items-center gap-2">
//           {isLogin ? (
//             <div className="relative">
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-orange-500"
//               >
//                 <User size={18} />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 top-12 z-50 w-[250px] rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
//                   <h3 className="text-sm font-bold text-gray-800">
//                     {userdata?.name || "User"}
//                   </h3>

//                   <p className="mt-1 break-all text-xs text-gray-500">
//                     {userdata?.email}
//                   </p>

//                   {userdata?.mobile && (
//                     <p className="mt-1 text-xs text-gray-500">
//                       {userdata.mobile || "No mobile number provided"}ss
//                     </p>
//                   )}
//                   {userdata?.address && (
//                     <p className="mt-1 text-xs text-gray-500">
//                       {userdata.address || "No address provided"}
//                     </p>
//                   )}

//                   <span className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
//                     {userdata?.role || "User"}
//                   </span>

//                   <hr className="my-3" />

//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
//                   >
//                     <LogOut size={16} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="hidden items-center gap-2 sm:flex">
//               <Link
//                 to="/login"
//                 className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
//               >
//                 Register
//               </Link>
//             </div>
//           )}

//           <button
//             onClick={() => setOpen(!open)}
//             className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 lg:hidden"
//           >
//             {open ? <X size={18} /> : <Menu size={18} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="absolute left-0 top-[68px] z-40 w-full rounded-2xl border border-orange-100 bg-white p-5 shadow-lg lg:hidden">
//           <div className="flex flex-col gap-4 text-sm font-medium text-gray-600">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-orange-500"
//                     : "transition hover:text-orange-500"
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}

//             {!isLogin && (
//               <div className="mt-2 grid grid-cols-2 gap-3 border-t pt-4">
//                 <Link
//                   to="/login"
//                   onClick={() => setOpen(false)}
//                   className="rounded-full border border-orange-200 px-4 py-2 text-center text-sm font-semibold text-orange-600"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   to="/register"
//                   onClick={() => setOpen(false)}
//                   className="rounded-full bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}

//             {isLogin && (
//               <button
//                 onClick={handleLogout}
//                 className="mt-2 flex items-center gap-2 border-t pt-4 text-sm text-red-500"
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;