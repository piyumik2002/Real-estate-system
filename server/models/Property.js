const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    desc: { type: String, required: true },

    // --- අලුතින් එක් කළ කොටස ---
    // මෙහි ගබඩා වෙන්නේ Like කරන පරිශීලකයන්ගේ User ID ලැයිස්තුවක් (Array එකක්)
    likes: { 
      type: [String], 
      default: [] 
    },

    // --- Automatic Map එක සඳහා අවශ්‍ය කොටස ---
    // මෙහි Number type එක භාවිතා කර ඇත්තේ Map එකට අගයන් නිවැරදිව ලබා දීමටයි
    latitude: { 
      type: Number, 
      required: false,
      default: null 
    },
    longitude: { 
      type: Number, 
      required: false, 
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);