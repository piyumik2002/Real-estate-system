const Property = require("../models/Property");
const axios = require("axios");

// 1. අලුත් ලිස්ටිං එකක් එකතු කිරීම (Automatic Geocoding සහිතව)
exports.addProperty = async (req, res) => {
  try {
    const { city, location } = req.body;
    let lat = null;
    let lng = null;

    // --- Automatic Geocoding Logic ---
    try {
      const searchQuery = `${location || ''}, ${city}, Sri Lanka`;
      let geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
        { headers: { 'User-Agent': 'LankaRealEstate_App/1.0' } }
      );

      // මුල් ලිපිනයෙන් හමුවුණේ නැත්නම්, නගරය (City) පමණක් භාවිතා කර නැවත සොයයි
      if (geoRes.data.length === 0 && city) {
        const backupQuery = `${city}, Sri Lanka`;
        geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(backupQuery)}`,
          { headers: { 'User-Agent': 'LankaRealEstate_App/1.0' } }
        );
      }

      if (geoRes.data && geoRes.data.length > 0) {
        lat = parseFloat(geoRes.data[0].lat);
        lng = parseFloat(geoRes.data[0].lon);
      }
    } catch (geoErr) {
      console.error("Geocoding error during create:", geoErr.message);
    }

    const propertyData = {
      ...req.body,
      latitude: lat,
      longitude: lng,
    };
    
    const newProperty = new Property(propertyData);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 2. සියලුම ලිස්ටිං ලබාගැනීම (Read)
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json(err);
  }
};

// --- ID එක අනුව එක දේපළක විස්තර ලබා ගැනීම ---
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json(err);
  }
};

// --- Category එක අනුව properties ලබා ගැනීම ---
exports.getPropertiesByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const properties = await Property.find({ 
      category: { $regex: new RegExp("^" + categoryName + "$", "i") } 
    }).sort({ createdAt: -1 });
    
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json(err);
  }
};

// --- React (Like/Unlike) කොටස ---
exports.reactProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    const { userId } = req.body;

    if (!property.likes.includes(userId)) {
      await property.updateOne({ $push: { likes: userId } });
      res.status(200).json("Property liked");
    } else {
      await property.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Property unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// 3. ලිස්ටිං එකක් අප්ඩේට් කිරීම (Automatic Geocoding සහිතව)
exports.updateProperty = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.body.city || req.body.location) {
      try {
        const searchQuery = `${req.body.location || ''}, ${req.body.city}, Sri Lanka`;
        let geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
          { headers: { 'User-Agent': 'LankaRealEstate_App/1.0' } }
        );

        // මුල් ලිපිනයෙන් හමුවුණේ නැත්නම්, නගරය (City) පමණක් භාවිතා කර නැවත සොයයි
        if (geoRes.data.length === 0 && req.body.city) {
          const backupQuery = `${req.body.city}, Sri Lanka`;
          geoRes = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(backupQuery)}`,
            { headers: { 'User-Agent': 'LankaRealEstate_App/1.0' } }
          );
        }

        if (geoRes.data && geoRes.data.length > 0) {
          updateData.latitude = parseFloat(geoRes.data[0].lat);
          updateData.longitude = parseFloat(geoRes.data[0].lon);
        }
      } catch (geoErr) {
        console.error("Geocoding error during update:", geoErr.message);
      }
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id, 
      { $set: updateData }, 
      { returnDocument: 'after' } 
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 4. ලිස්ටිං එකක් ඉවත් කිරීම (Delete)
exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Property deleted successfully.");
  } catch (err) {
    res.status(500).json(err);
  }
};

// --- ⭐ වැඩිම Likes/Reactions ඇති පෝස්ට් 6 ලබා ගැනීම (Updated Logic) ---
exports.getFeaturedProperties = async (req, res) => {
  try {
    const featuredProperties = await Property.aggregate([
      {
        $addFields: {
          // 'likes' array එකේ තියෙන items ගණන ($size) ගණනය කර 'likesCount' ලෙස අලුත් field එකක් තාවකාලිකව හදනවා
          likesCount: {
            $cond: {
              if: { $isArray: "$likes" },
              then: { $size: "$likes" },
              else: 0
            }
          }
        }
      },
      // ලයික් වැඩිම ඒවා මුලට එන ලෙස (Descending order) sort කරනවා
      { $sort: { likesCount: -1, createdAt: -1 } },
      // හරියටම පෝස්ට් 6ක් විතරක් සීමා කරනවා
      { $limit: 6 }
    ]);

    res.status(200).json(featuredProperties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching featured properties", error: err });
  }
};