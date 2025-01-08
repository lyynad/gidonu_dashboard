import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const PrivateRoute = () => {
  const { auth } = useAuth();

  return auth.user?.email ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
