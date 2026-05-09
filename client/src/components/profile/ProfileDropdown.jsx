import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useRef } from "react";
import GoogleTranslate from "../GoogleTranslate";

const ProfileDropdown = ({
  userdata,
  profileOpen,
  setProfileOpen,
  handleLogout,
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleProfileUpdate = (e) => {
    e.stopPropagation();
    setProfileOpen(false);
    navigate("/profile");
  };

  const onLogout = async (e) => {
    e.stopPropagation();
    setProfileOpen(false);
    await handleLogout();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setProfileOpen]);

  return (
    <div ref={dropdownRef} className="relative z-50">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setProfileOpen((prev) => !prev);
        }}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-orange-500"
      >
        <User size={18} />
      </button>

      {profileOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-12 z-[9999] w-[270px] rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
        >
          <h3 className="text-sm font-bold text-gray-800">
            {userdata?.name || userdata?.fullName || "User"}
          </h3>

          <p className="mt-1 break-all text-xs text-gray-500">
            {userdata?.email || "No email"}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {userdata?.mobile || "No mobile number provided"}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {userdata?.address || "No address provided"}
          </p>

          <span className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 capitalize">
            {userdata?.role || "citizen"}
          </span>

          <hr className="my-3" />

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-600">
              Select Language
            </p>
            <GoogleTranslate />
          </div>

          <hr className="my-3" />

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleProfileUpdate}
              className="flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-500 transition hover:bg-orange-200"
            >
              <FaUserEdit size={14} />
              Profile
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2 text-sm text-red-500 transition hover:text-red-600"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;