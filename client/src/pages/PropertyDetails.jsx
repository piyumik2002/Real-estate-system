import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Map from "../components/Map"; 

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching details:", err);
        setLoading(false);
      }
    };
    fetchProperty();
    window.scrollTo(0, 0);
  }, [id]);

  const handleWhatsAppClick = () => {
    if (!property || !property.contact) {
      alert("Contact number not found!");
      return;
    }
    const formattedNumber = property.contact.startsWith('0') 
      ? `94${property.contact.substring(1)}` 
      : property.contact;

    // UPDATE: WhatsApp message එකේ මිල පෙන්වන විට Math.round භාවිතා කළා
    const message = `Hello, I'm interested in: *${property.title}*\nPrice: LKR ${Math.round(property.price).toLocaleString()} M`;
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900">
      <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#303048] via-[#fffbeb]/50 to-[#bcb8dc] pb-12">
      
      <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#f8f8fa] to-[#d8d8e1] border-b border-slate-300/30 shadow-lg backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-18 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-indigo-600 text-indigo-100 rounded-xl transition-all group border border-slate-700 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="font-bold text-sm tracking-wide">Return to Properties</span>
          </button>
          
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">Listing Active</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] mb-8">
          <div className="md:col-span-3 overflow-hidden rounded-[2.5rem] shadow-2xl group relative border-4 border-white">
            <img src={property.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
               <span className="px-4 py-2 bg-indigo-600 text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-xl">
                 {property.category || 'Premium Listing'}
               </span>
            </div>
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4">
            {property.images.slice(1, 3).map((img, i) => (
              <div key={i} className="overflow-hidden rounded-[1.8rem] shadow-xl border-4 border-white group">
                <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sub" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/50 p-6 md:p-10">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 capitalize mb-3 tracking-tight leading-tight">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 w-fit px-3 py-1.5 rounded-full text-xs">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                  {property.location}, {property.city}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Description</span>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>
                <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line font-medium">
                  {property.desc}
                </p>

                <div className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-slate-200"></div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Location Map</span>
                    <div className="h-px flex-1 bg-slate-200"></div>
                  </div>
                  
                  {property.latitude && property.longitude ? (
                    <Map 
                      lat={parseFloat(property.latitude)} 
                      lng={parseFloat(property.longitude)} 
                      title={property.title} 
                      location={property.location}
                      city={property.city}
                    />
                  ) : (
                    <div className="h-[300px] bg-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400 font-medium border-2 border-dashed border-slate-200 p-6 text-center">
                      <div className="w-8 h-8 border-4 border-slate-300 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                      <p className="font-bold text-slate-500">Fetching Location Map...</p>
                      <p className="text-[11px] mt-1 text-slate-400">Based on: {property.city}, Sri Lanka</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1"> 
            <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Investment Value</span>
                  <div className="text-4xl font-black text-white">
                    {/* UPDATE: මෙතැනදී Math.round එකතු කළා මිල නිවැරදිව පෙන්වීමට */}
                    LKR {Math.round(property.price).toLocaleString()} M
                  </div>
                </div>

                <div className="space-y-4">
                  <a 
                    href={`tel:${property.contact}`} 
                    className="block p-5 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
                  >
                    <span className="block text-[10px] text-indigo-300 font-black uppercase tracking-widest mb-3">Direct Contact</span>
                    <div className="flex items-center gap-4 text-white">
                       <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                       </div>
                       <span className="text-xl font-bold tracking-tight">{property.contact}</span>
                    </div>
                  </a>

                  <button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-[#25D366] hover:bg-[#1fae53] text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-green-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 text-lg"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.32c1.516.9 3.298 1.376 5.12 1.377 5.731 0 10.395-4.661 10.398-10.392.002-2.777-1.078-5.388-3.041-7.354s-4.577-3.042-7.353-3.043c-5.732 0-10.396 4.662-10.399 10.393-.001 1.838.484 3.626 1.403 5.161l-.993 3.628 3.715-.974z"/>
                    </svg>
                    WhatsApp Inquiry
                  </button>
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] opacity-50">
              Luxury Real Estate Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}