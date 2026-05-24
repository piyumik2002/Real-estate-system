import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

//const router = require("express").Router();
//const { addProperty, getProperties, updateProperty, deleteProperty } = require("../controllers/propertyController");

// මෙතනදී මුලින්ම Token එක බලනවා, පස්සේ Admin ද බලනවා, දෙකම හරි නම් විතරයි Property එකක් හදන්න දෙන්නේ
router.post("/", verifyToken, verifyAdmin, createProperty);
router.delete("/:id", verifyToken, verifyAdmin, deleteProperty);
router.put("/:id", verifyToken, verifyAdmin, updateProperty);

//router.post("/", addProperty);
//router.get("/", getProperties);
//router.put("/:id", updateProperty);    // PUT method එක Edit සඳහා
//router.delete("/:id", deleteProperty); // DELETE method එක ඉවත් කිරීම සඳහා

module.exports = router;


