import { useState, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import axios from "axios";
import PropertyCard from "../components/PropertyCard"; 

export default function PropertiesPage({ currentUser }) { 
  const [dbProperties, setDbProperties] = useState([]);
  
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setDbProperties(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchAllProperties();
  }, []);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const filteredProperties = dbProperties.filter((prop) => {
    return (
      prop.title.toLowerCase().includes(searchQuery) ||
      (prop.location && prop.location.toLowerCase().includes(searchQuery)) ||
      (prop.city && prop.city.toLowerCase().includes(searchQuery))
    );
  });

  return (
    /* py-20 ඉවත් කර pt-4 ලබා දීමෙන් Navbar එකට ආසන්න කළා */
    <div className="pt-4 pb-20 bg-gradient-to-r from-[#5d6e88] via-[#cbdbf7] to-[#424d5f] min-h-screen">
      
      {/* pt-2 මඟින් මාතෘකාව සහ Navbar එක අතර සෙන්ටිමීටරයක පමණ නිවැරදි පරතරය පවත්වා ගනී */}
      <div className="container mx-auto px-6 pt-2 pb-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-slate-1000/30 pb-5">
          
          <div className="space-y-3">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : "All Properties"}
            </h2>
            <p className="text-slate-600 font-medium max-w-lg leading-relaxed">
              Explore a curated list of the finest real estate opportunities available. Your dream home is just a click away.View all our available listings and find the perfect space for your future today.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {searchQuery && (
              <Link 
                to="/properties" 
                className="flex-1 md:flex-none text-center text-sm font-bold text-indigo-600 hover:text-white transition-all bg-white hover:bg-indigo-600 px-5 py-3 rounded-xl shadow-sm border border-indigo-100"
              >
                Show All Properties
              </Link>
            )}

            <Link 
              to="/" 
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all shadow-lg shadow-slate-900/10 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => (
              <div key={prop._id} className="transform hover:-translate-y-1 transition-transform duration-300">
                <PropertyCard prop={prop} currentUser={currentUser} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-32 bg-white/20 rounded-[2rem] border border-dashed border-slate-400/50">
              <p className="text-xl font-medium text-slate-600">No properties found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}