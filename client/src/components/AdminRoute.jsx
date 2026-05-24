/*import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  // User ලොග් වෙලා නැත්නම් හෝ Admin නෙවෙයි නම් Home එකට යවන්න
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}*/

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom"; // Outlet එක Import කරන්න

export default function AdminRoute() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  // මෙතන 'children' වෙනුවට 'Outlet' පාවිච්චි කරන්න
  return <Outlet />; 
}