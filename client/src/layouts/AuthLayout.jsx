import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#faf7f8]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;