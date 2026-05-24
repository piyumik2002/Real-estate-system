import { createContext, useEffect, useState } from "react";

// Context එක නිර්මාණය කිරීම
export const AuthContext = createContext();

// Provider එක නිර්මාණය කිරීම (පහසුව සඳහා මෙයට 'AuthContextProvider' ලෙස නම දෙමු)
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // User දත්ත update කරන function එක
  const updateUser = (data) => {
    setCurrentUser(data);
  };

  const logout = () => {
    setCurrentUser(null); // State එක null කරනවා (UI එක auto refresh වෙන්න)
    localStorage.removeItem("user"); // LocalStorage එකෙන් අයින් කරනවා
  };

  // currentUser වෙනස් වන සෑම විටම එය localStorage එකේ save කිරීම
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user"); // Logout වුණොත් localStorage එකෙන් අයින් කරන්න
    }
  }, [currentUser]);

  // AuthContext.jsx එකේ...
  return (
    <AuthContext.Provider value={{ currentUser, updateUser,logout }}> 
      {children}
    </AuthContext.Provider>
  );
};