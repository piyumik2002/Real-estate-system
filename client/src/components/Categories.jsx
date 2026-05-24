import { Link } from 'react-router-dom';
// --- ⭐ Modern Icons Import කිරීම ---
import { BiBuildingHouse, BiMapAlt, BiHomeCircle } from 'react-icons/bi';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

export default function Categories() {
  // --- ⭐ Icons & Data (Logic unchanged) ---
  const cats = [
    { 
      name: "House", 
      icon: <BiBuildingHouse className="w-10 h-10 text-indigo-600" />, 
      slug: "House" 
    },
    { 
      name: "Land", 
      icon: <BiMapAlt className="w-10 h-10 text-green-600" />, 
      slug: "Land" 
    },
    { 
      name: "Apartment", 
      icon: <HiOutlineBuildingOffice2 className="w-10 h-10 text-sky-600" />, 
      slug: "Apartment" 
    },
    { 
      name: "Commercial", 
      icon: <BiHomeCircle className="w-10 h-10 text-amber-600" />, 
      slug: "Commercial" 
    },
  ];

  return (
    /* bg-gradient-to-r මඟින් වමේ සිට දකුණට වර්ණය විහිදේ.
       slate-200 සහ slate-300 අතර සංකලනයක් භාවිතා කර ඇති නිසා ඉහළ Navbar එකට ඉතා හොඳින් ගැළපේ.
    */
    <section className="py-20 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300">
      <div className="container mx-auto px-6">
        
        {/* Header Section: Layout logic unchanged */}
        <div className="text-center mb-12 space-y-4">
           <div className="space-y-1">
             <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">Discover Now</span>
             <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">Browse by Category</h2>
           </div>
           
           <p className="text-slate-600 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
             Find your ideal property with ease. Explore our expertly curated categories 
             designed to help you discover the perfect space for your lifestyle and goals.
           </p>
        </div>

        {/* Grid: Layout logic unchanged */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {cats.map((cat) => (
            <Link 
              to={`/category/${cat.slug}`} 
              key={cat.name} 
              className="group border border-slate-200/60 rounded-2xl p-6 text-center flex flex-col items-center gap-3 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                {cat.icon}
              </div>

              {/* Title */}
              <span className="text-lg font-bold text-slate-700 tracking-tight group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}