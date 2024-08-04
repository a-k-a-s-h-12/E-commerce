import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminRoute = () => {
  const { userInformation } = useSelector((store) => store.auth);
  return userInformation ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
