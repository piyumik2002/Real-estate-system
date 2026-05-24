import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />; // ලොග් වෙලා නැත්නම් login පිටුවට යවන්න
  }

  return <Outlet />; // ලොග් වෙලා නම්, ඒ page එක පෙන්නන්න
}

export default ProtectedRoute;