import { Navigate, Outlet } from "react-router-dom";
import useUserData from "../../hooks/useUserData";

const ProtectedRouteAdmin = ({ redirectPath = "/list" }) => {
  const user = useUserData();
  
  if (user.role !== 'admin') {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRouteAdmin;
