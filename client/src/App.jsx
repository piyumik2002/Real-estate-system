import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './pages/Home';
import CategoryProperties from './pages/CategoryProperties';
import AboutUs from './pages/AboutUs';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetails from './pages/PropertyDetails';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider, AuthContext } from './context/AuthContext';
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./components/AdminRoute";

// 1. Routes සහ useContext එක පාවිච්චි කරන කොටස වෙනම Component එකකට ගත්තා
function AppContent() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/about" element={<AboutUs />} />

          <Route element={<ProtectedRoute />}>
            {/* දැන් මෙතනට currentUser හරියට ලැබෙනවා */}
            <Route path="/properties" element={<PropertiesPage currentUser={currentUser} />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/category/:category" element={<CategoryProperties currentUser={currentUser} />} />
           
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<Hero />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// 2. ප්‍රධාන App Component එක ඇතුළේ Provider එකෙන් AppContent එක වට කළා
function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;