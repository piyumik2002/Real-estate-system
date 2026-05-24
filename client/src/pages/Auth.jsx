import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; 

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const { updateUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      fullName: '',
      email: '',
      password: ''
    });
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        // --- LOGIN ක්‍රියාවලිය ---
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        }, {
          withCredentials: true 
        });

        // Debugging: Backend එකෙන් එන දත්ත පරීක්ෂා කිරීම
        console.log("Backend response data:", res.data);

        // දත්ත update කර form එක clear කරන්න
        updateUser(res.data);
        setFormData({ fullName: '', email: '', password: '' });
        
        navigate('/'); 
        
      } else {
        // --- REGISTER ක්‍රියාවලිය ---
        await axios.post('http://localhost:5000/api/auth/register', formData);
        
        alert("Registration Successful! Please Login.");
        setFormData({ fullName: '', email: '', password: '' });
        setIsLogin(true); 
      }
    } catch (err) {
      console.log("Full Error Details:", err);
      alert(err.response?.data?.message || "Something went wrong! Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative 
                    bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop')] 
                    bg-cover bg-center bg-no-repeat">
      
      <div className="absolute inset-0 bg-slate-900/60"></div>

      <div className="relative z-10 max-w-lg w-full space-y-10 bg-white p-12 rounded-3xl shadow-2xl transform transition-all">
        
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join EstatePro'}
          </h2>
          <p className="mt-4 text-slate-500 font-medium">
            {isLogin ? "New to our platform?" : "Already a member?"}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 hover:text-indigo-800 font-bold underline-offset-4 hover:underline transition"
            >
              {isLogin ? 'Create an account' : 'Log in here'}
            </button>
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={formData.fullName}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-slate-50"
                  placeholder="Your Name"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                autoComplete="off"
                value={formData.email}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-slate-50"
                placeholder="name@company.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                autoComplete="off"
                value={formData.password}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-slate-50"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transform active:scale-95 transition-all"
          >
            {isLogin ? 'Sign In' : 'Get Started'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm font-medium text-slate-400 hover:text-indigo-600 transition flex items-center justify-center gap-2">
            <span>&larr;</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}