import { useContext } from 'react'; // 1. useContext එකතු කළා
import { AuthContext } from '../context/AuthContext';
import Categories from '../components/Categories'; 
//import Stats from '../components/Stats';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  // Hero section එකේ සර්ච් කරන විට Properties Page එකට සර්ච් ක්වෙරි එක යැවීම
  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/properties?search=${query.toLowerCase()}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <div>
      {/* 1. Hero එකට Search function එක ලබා දීම */}
      <Hero onSearch={handleSearch} />
      
      <Categories />

      {/* 2. FeaturedProperties එක දැන් සජීවීව Backend එකෙන් දත්ත ගනියි. 
         එම නිසා මෙතනින් properties={properties} ලෙස props යැවීම අවශ්‍ය නැත.
      */}
      
      <FeaturedProperties currentUser={currentUser} />
      
    </div>
  );
}