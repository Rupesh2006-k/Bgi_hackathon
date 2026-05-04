import { LogOut, User } from "lucide-react";

const ProfileDropdown = ({
  userdata,
  profileOpen,
  setProfileOpen,
  handleLogout,
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-orange-500"
      >
        <User size={18} />
      </button>

      {profileOpen && (
        <div className="absolute right-0 top-12 z-50 w-[250px] rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          <h3 className="text-sm font-bold text-gray-800">
            {userdata?.name || "User"}
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
            {userdata?.role || "User"}
          </span>

          <hr className="my-3" />

          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 text-sm text-red-500 hover:text-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
