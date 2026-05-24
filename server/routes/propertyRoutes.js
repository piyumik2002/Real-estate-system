/*const express = require("express");
const router = express.Router();
const { 
  addProperty, 
  getProperties, 
  updateProperty, 
  deleteProperty 
} = require("../controllers/propertyController");

router.post("/", addProperty);         // Add
router.get("/", getProperties);        // Get All
router.put("/:id", updateProperty);    // Update
router.delete("/:id", deleteProperty); // Delete

module.exports = router;*/

const express = require("express");
const router = express.Router();

// Controller එකෙන් functions ගෙන්වා ගැනීම
const { 
  getFeaturedProperties,
  addProperty, 
  getProperties, 
  getPropertyById,
  getPropertiesByCategory,
  reactProperty,
  updateProperty, 
  deleteProperty 
} = require("../controllers/propertyController");

// Middleware ගෙන්වා ගැනීම (Security සඳහා)
//const { verifyToken } = require("../middleware/verifyToken");
//const { verifyAdmin } = require("../middleware/verifyAdmin");

// --- PUBLIC ROUTES ---
// ඕනෑම කෙනෙක්ට පෝස්ට් බැලීමට හැකි විය යුතු නිසා මෙතනට Middleware අවශ්‍ය නැත
router.get("/", getProperties);
router.get("/featured", getFeaturedProperties);
router.get("/:id", getPropertyById);
router.get("/category/:category", getPropertiesByCategory);
router.post("/react/:id", reactProperty);
router.put("/:id/react", reactProperty);
// --- ADMIN ONLY ROUTES ---
// අලුත් පෝස්ට් එකක් දැමීමට, Edit කිරීමට සහ Delete කිරීමට Admin බලය තිබිය යුතුය
//router.post("/", verifyToken, verifyAdmin, addProperty);
//router.put("/:id", verifyToken, verifyAdmin, updateProperty);
//router.delete("/:id", verifyToken, verifyAdmin, deleteProperty);

router.post("/", addProperty); 
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;