import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext); 

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      logout(); 
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* 1. Logo */}
        <div className="text-2xl font-bold tracking-tighter text-indigo-400">
          <Link to="/">EstatePro<span className="text-white"></span></Link>
        </div>

        {/* 2. Main Navigation Links */}
        <div className="hidden md:flex gap-10 font-medium items-center">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/properties" className="hover:text-indigo-400 transition">Properties</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">About Us</Link>
        </div>

        {/* 3. Dynamic Action Buttons (Login/Logout/Admin) */}
        <div className="flex items-center gap-6">
          {currentUser ? (
            <div className="flex items-center gap-6">
              
              {/* --- Professional Admin Dashboard Link --- */}
              {currentUser.isAdmin && (
                <Link 
                  to="/admin" 
                  className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 px-4 py-2 rounded-xl border border-indigo-500/30 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-bold text-sm tracking-wide">ADMIN PANEL</span>
                </Link>
              )}

              <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
                <div className="flex flex-col items-end">
                  {/* ⭐ නම පෙන්වන කොටස: 'Hi,' සමඟ First Name පමණක් පෙන්වයි */}
                  <span className="text-indigo-300 font-bold text-sm uppercase">
                    Hi ,  {currentUser.fullName ? currentUser.fullName.split(" ")[0] : "User"}
                  </span>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-bold"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 font-bold tracking-wide"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}







