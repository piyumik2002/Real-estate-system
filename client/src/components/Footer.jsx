import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Footer() {
const { currentUser } = useContext(AuthContext);

console.log("Footer User Check:", currentUser);

  return (
    <footer className="bg-slate-950 text-gray-400 py-12 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
        {/* EstatePro Details */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">EstatePro</h3>
          <p>Sri Lanka's most trusted real estate platform. Find your dream home with us.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-indigo-400 cursor-pointer">About Us</li>
            <li className="hover:text-indigo-400 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-indigo-400 cursor-pointer">Privacy Policy</li>
            
            {/* මෙතනයි අලුතින් ඇතුළත් කළේ - Admin ට විතරයි පේන්නේ */}
            {currentUser?.isAdmin && (
              <li>
                <Link to="/admin" className="text-indigo-500 font-bold hover:text-indigo-300">
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <p>Email: support@estatepro.lk</p>
          <p>Hotline: +94 11 200 3000</p>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-slate-800 pt-6">
        © 2026 EstatePro. All Rights Reserved.
      </div>
    </footer>
  );
}