import { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard"; // අපි හදාගත්තු පොදු Card එක පාවිච්චි කරමු

export default function FeaturedProperties({ currentUser }) { // currentUser ලබාගන්න
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // 1. Backend එකේ අපි හදපු /featured route එකට call කරනවා
        const res = await axios.get("http://localhost:5000/api/properties/featured");
        
        // 2. දැනටමත් backend එකෙන් sort කරලා 6ක් එවන නිසා slice අවශ්‍ය වෙන්නේ නැහැ
        setProperties(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    /* ⭐ Background Update: 
       Navbar එකේ තද නිල් පැහැයට ගැළපෙන පරිදි 'from-slate-800 via-slate-900 to-slate-800' භාවිතා කළා.
       මෙය දෙපසට වර්ණය මඳක් වෙනස් වන (Symmetric Gradient) පෙනුමක් ලබා දෙයි.
    */
    <section className="py-20 bg-gradient-to-r from-[#5d6e88] via-[#c1c6d3] to-[#424d5f]">
      <div className="container mx-auto px-4">
        
        {/* Header Section: Dark background එක නිසා අකුරු සුදු පැහැයෙන් (text-white) සකස් කළා */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">Featured Properties</h2>
          <p className="text-slate-400 text-lg font-medium">
            Handpicked top-rated properties based on user reactions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-10 text-slate-400 italic">
              Loading top properties...
            </div>
          ) : (
            <>
              {properties && properties.length > 0 ? (
                properties.map((prop) => (
                  /* 3. මෙතනදී අපි පරණ HTML div එක වෙනුවට 
                      අපේ PropertyCard එක දානවා. එවිට Heart Icon එකත් මෙතන පේනවා. */
                  <PropertyCard key={prop._id} prop={prop} currentUser={currentUser} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-slate-400 text-lg">No properties found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}