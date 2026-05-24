import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from "../components/PropertyCard"; 

export default function CategoryProperties({ currentUser }) { 
  const { category } = useParams(); 
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/properties/category/${category}`);
        setFilteredProperties(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [category]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
      <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="py-10 px-4 bg-gradient-to-r from-[#5d6e88] via-[#c1c6d3] to-[#424d5f]">
      <div className="container mx-auto">
        
        {/* pt-4 මඟින් Navbar එකට සෙන්ටිමීටරයක් පමණ ලං කර Header එක සකසා ඇත */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 pt-4 border-b border-slate-300 pb-6">
          
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-800 capitalize tracking-tight">
              {category}s For You
            </h2>
            <p className="text-slate-800 font-medium max-w-md">
              Discover the finest {category}s handpicked for your lifestyle. Find your dream space from our exclusive listings today.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/10 border border-indigo-100 group"
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
            <div className="col-span-full text-center py-32 bg-white/50 rounded-[3rem] border border-dashed border-slate-300 backdrop-blur-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <p className="text-slate-500 text-xl font-semibold italic">No {category}s available at the moment.</p>
              <p className="text-slate-400 text-sm mt-2 font-medium uppercase tracking-widest">Check back soon for new updates</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}