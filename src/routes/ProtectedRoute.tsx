import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../types/storeTypes";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const token = useSelector((state: RootState) => state.userSlice.token);
  if (!token) {
    return <Navigate to={redirectPath} replace={true} />;
  }
  return <Outlet />;
};
