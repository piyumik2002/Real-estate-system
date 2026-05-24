import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

export default function PropertyCard({ prop, currentUser }) {
  // පෝස්ට් එකේ Likes තිබේ නම් ඒවා පෙන්වීමට, නැතිනම් 0 ලෙස පෙන්වීමට
  const [likes, setLikes] = useState(prop.likes ? prop.likes.length : 0);
  const [isLiked, setIsLiked] = useState(prop.likes ? prop.likes.includes(currentUser?._id) : false);

  const handleLike = async () => {
    if (!currentUser) return alert("Please login to react!");
    
    try {
      await axios.put(`http://localhost:5000/api/properties/${prop._id}/react`, { userId: currentUser._id });
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error reacting:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full border border-slate-100">
      
      {/* 1. පින්තූරය පෙන්වීම */}
      <img 
        src={prop.images && prop.images[0] ? prop.images[0] : "https://via.placeholder.com/400x300"} 
        alt={prop.title} 
        className="w-full h-48 object-cover" 
      />
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          {/* 2. මාතෘකාව (Title) */}
          <h3 className="text-xl font-semibold capitalize">{prop.title}</h3>
          
          {/* 3. React (Like) Button එක */}
          <button onClick={handleLike} className="flex items-center gap-1 group">
            {isLiked ? (
              <HeartSolid className="w-6 h-6 text-red-500 transition-transform scale-110" />
            ) : (
              <HeartIcon className="w-6 h-6 text-slate-400 group-hover:text-red-400 transition-colors" />
            )}
            <span className={`text-sm font-bold ${isLiked ? 'text-red-500' : 'text-slate-400'}`}>
              {likes}
            </span>
          </button>
        </div>

        {/* 4. නගරය සහ ස්ථානය (City & Location) */}
        <p className="text-gray-500 text-sm mb-2">📍 {prop.city} • {prop.location}</p>
        
        {/* 5. මිල (Price) */}
        <p className="text-indigo-600 font-extrabold text-lg">
          LKR {Number(prop.price).toLocaleString()}
        </p>
        
        {/* 6. View Details Button එක */}
        <div className="mt-auto pt-4">
          <Link 
            to={`/properties/${prop._id}`} 
            className="block text-center bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}