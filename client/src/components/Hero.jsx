import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. අලුතින් import කරන්න

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // 2. navigate hook එක පාවිච්චි කරන්න

  // Search button එක එබුවම ක්‍රියාත්මක වන කොටස
  const handleSearchClick = () => {
    // 3. කෙලින්ම Properties පේජ් එකට search term එකත් එක්ක යනවා
    // උදා: /properties?search=Colombo
    if (searchTerm.trim() !== "") {
       navigate(`/properties?search=${searchTerm}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="relative bg-slate-900 text-white min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
        alt="Real Estate Hero" 
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      
      {/* Content overlay */}
      <div className="relative container mx-auto px-6 text-center z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Find your dream home with <span className="text-indigo-400">EstatePro</span>
        </h1>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Sri Lanka's most trusted real estate platform. Buy, sell, or rent your property easily.
        </p>

        {/* Updated Search Bar */}
        <div className="bg-white p-2 rounded-full shadow-lg max-w-2xl mx-auto flex items-center">
          <input 
            type="text" 
            placeholder="Search by city, region or property name..." 
            className="flex-grow p-3 px-6 rounded-full outline-none text-slate-800 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={handleSearchClick}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}