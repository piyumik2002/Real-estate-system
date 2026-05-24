import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPage() {
  const [properties, setProperties] = useState([]); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentId, setCurrentId] = useState(null); 

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  
  const [property, setProperty] = useState({ 
    title: '', price: '', category: "", image: '', city: '', location: '', contact: '', desc: '' 
  });

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  // ⭐ Search Logic එක crash නොවී නූලටම වැඩ කරන්න මෙතන ආරක්ෂිතව සකස් කළා:
  const filteredProperties = properties.filter((item) => {
    const itemTitle = item && item.title ? item.title.toLowerCase() : "";
    const currentSearch = searchTerm ? searchTerm.toLowerCase() : "";
    
    return (
      itemTitle.includes(currentSearch) &&
      (filterCategory === "" || item.category === filterCategory)
    );
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProperty({ ...property, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validPrice = property.price ? parseFloat(property.price.toString().replace(/,/g, '')) : 0;

    const finalData = { 
      ...property, 
      price: isNaN(validPrice) ? 0 : validPrice, 
      images: property.image ? [property.image] : (property.images || [])
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/properties/${currentId}`, finalData, { withCredentials: true });
        alert("Property Updated Successfully!");
      } else {
        await axios.post("http://localhost:5000/api/properties", finalData, { withCredentials: true });
        alert("Property Added Successfully!");
      }
      
      resetForm();

      setTimeout(() => {
        fetchProperties();
      }, 300);

    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      alert("Operation failed! Check console details.");
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    
    setProperty({ 
      title: item.title || '',
      price: item.price ? item.price.toString() : '', 
      category: item.category || "",
      image: item.images && item.images[0] ? item.images[0] : '',
      city: item.city || '',
      location: item.location || '',
      contact: item.contact || '',
      desc: item.desc || '',
      images: item.images || []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`http://localhost:5000/api/properties/${id}`, { withCredentials: true });
        fetchProperties();
      } catch (err) { alert("Delete failed"); }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setProperty({ title: '', price: '', category: '', image: '', city: '', location: '', contact: '', desc: '' });
  };

  return (
    <div className="py-20 bg-gradient-to-r from-[#5d6e88] via-[#c1c6d3] to-[#424d5f] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">Admin Control Panel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-slate-50/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl shadow-indigo-900/5 border border-white/50 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                <span className={`px-2 py-1 rounded text-xs text-white ${isEditing ? 'bg-amber-500' : 'bg-indigo-600'}`}>
                  {isEditing ? "Edit" : "New"}
                </span>
                {isEditing ? "Update Property" : "Add Property"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Property Title" value={property.title} onChange={(e) => setProperty({...property, title: e.target.value})} className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" required />
                
                <input type="number" step="any" placeholder="Price (M)" value={property.price} onChange={(e) => setProperty({...property, price: e.target.value})} className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" required />
                
                <select 
                  value={property.category} 
                  onChange={(e) => setProperty({...property, category: e.target.value})} 
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer" 
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>

                <div className="relative h-44 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center overflow-hidden bg-white hover:border-indigo-400 transition-all group">
                  {property.image ? (
                    <img src={property.image} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="text-2xl text-slate-300 group-hover:text-indigo-400 mb-1">+</div>
                      <span className="text-xs text-slate-400 font-medium">Add Main Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" value={property.city} onChange={(e) => setProperty({...property, city: e.target.value})} className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" required />
                  <input type="text" placeholder="Contact" value={property.contact} onChange={(e) => setProperty({...property, contact: e.target.value})} className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" required />
                </div>

                <input type="text" placeholder="Exact Location" value={property.location} onChange={(e) => setProperty({...property, location: e.target.value})} className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" required />

                <textarea placeholder="Description" rows="3" value={property.desc} onChange={(e) => setProperty({...property, desc: e.target.value})} className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none" required />

                <button type="submit" className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${isEditing ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : 'bg-slate-900 hover:bg-indigo-600 shadow-indigo-900/20'}`}>
                  {isEditing ? "Save Changes" : "Publish Listing"}
                </button>
                
                {isEditing && (
                  <button type="button" onClick={resetForm} className="w-full text-sm text-slate-400 mt-2 hover:text-red-500 transition-colors font-medium">
                    Cancel Editing
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-white">
              <h2 className="text-xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                Manage Active Listings
                <span className="text-xs font-normal bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{filteredProperties.length} Properties</span>
              </h2>

              {/* ⭐ මෙතන Search සහ Category filter දෙකම එකට වැඩ කරන්න ලස්සනට සකස් කළා */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-[2]">
                  <input type="text" placeholder="Search by property title..." className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="flex-[1]">
                  <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all cursor-pointer">
                    <option value="">All Categories</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
              </div>
              
              <div className="grid gap-4 max-h-[750px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((item) => (
                    <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all gap-4">
                      <div className="flex items-center gap-5 w-full">
                        <div className="relative">
                          <img src={item.images && item.images[0] ? item.images[0] : "https://via.placeholder.com/150"} alt="thumb" className="w-24 h-24 object-cover rounded-2xl bg-slate-100 border border-slate-50" />
                          <span className="absolute top-1 left-1 bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">{item.category}</span>
                        </div>
                        <div className="overflow-hidden space-y-1">
                          <h4 className="font-bold text-slate-800 truncate text-lg">{item.title}</h4>
                          <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                             <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md text-base">LKR {item.price ? parseFloat(item.price).toLocaleString() : 0} M</span>
                             • {item.city}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button onClick={() => handleEdit(item)} className="flex-1 sm:flex-none px-6 py-2.5 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100">Edit</button>
                        <button onClick={() => handleDelete(item._id)} className="flex-1 sm:flex-none px-6 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-100">Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 italic bg-white rounded-2xl border border-dashed border-slate-200">
                    No matching properties found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}