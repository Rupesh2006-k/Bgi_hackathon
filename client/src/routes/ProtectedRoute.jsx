import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  
  const user = useSelector((state) => state.user);

  const isLogin = user?._id || user?.email;

  if (isLogin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
