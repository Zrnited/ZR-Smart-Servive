import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context";

export default function Auth() {
  const { accessToken } = useAppContext();
  //   Check if a user is authenticated
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
