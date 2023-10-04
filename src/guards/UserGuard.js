import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const UserGuard = () => {
  const { user } = useContext(AuthContext);

  if (user?.id) return <Navigate to="/" />;
  
  return <Outlet />;
};
