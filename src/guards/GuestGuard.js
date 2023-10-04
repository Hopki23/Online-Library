import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const GuestGuard = () => {
  const { user } = useContext(AuthContext);

  if (!user.id) return <Navigate to='/login' />;

  return <Outlet />;
};
