//import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    /* ⭐ Background Update: Unchanged */
    <div className="py-20 bg-gradient-to-r from-[#94a4bb] via-[#d3d4d8] to-[#a3b1c7]">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About EstatePro</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sri Lanka's leading real estate platform dedicated to making your property journey simple, transparent, and efficient.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
            {/* ⭐ අකුරු වල ප්‍රමාණය text-lg ලෙසත්, පැහැය text-slate-700 ලෙසත් වැඩි කළා */}
            <p className="text-slate-700 text-lg font-medium leading-relaxed mb-6">
              At EstatePro, we believe that finding a home should be an exciting experience, not a stressful one. 
              Our mission is to bridge the gap between property seekers and sellers using cutting-edge technology 
              and a human-centric approach.
            </p>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">
              Whether you are buying your first home, renting an apartment, or investing in commercial land, 
              we are here to guide you every step of the way.
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-semibold text-indigo-900 mb-4">Why Choose Us?</h3>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-center">✅ Verified Property Listings</li>
              <li className="flex items-center">✅ Trusted Agent Network</li>
              <li className="flex items-center">✅ Advanced Search Filters</li>
              <li className="flex items-center">✅ 24/7 Customer Support</li>
            </ul>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-slate-900 text-white p-12 rounded-2xl text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Ready to find your dream property?</h2>
          <p className="text-slate-300 mb-8 max-w-md mx-auto">
            Our team is here to assist you. Start your search today.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/properties" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-indigo-500/20">
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}