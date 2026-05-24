import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login Logic
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid Password!" });

    // ✅ 1. මම කිව්වා වගේ මෙතන .toObject() භාවිතා කරන්න. 
    // එතකොට තමයි isAdmin ඇතුළු සියලුම fields 'userInfo' එකට එන්නේ.
    const { password: hashedPassword, ...userInfo } = user.toObject();

    // ✅ 2. Token එක ඇතුළටත් isAdmin දත්තය දාන්න. 
    // එතකොට තමයි Backend Middleware (verifyAdmin) එකට මේක අහුවෙන්නේ.
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET || "your_secret_key", 
      { expiresIn: "1d" }
    );

    // 3. Cookie එක සකස් කිරීම
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // Localhost එකේදී 'false' දීම වඩාත් හොඳයි (HTTPS නැති නිසා)
      sameSite: "lax" // Localhost එකේදී 'lax' භාවිතා කරන්න
    })
    .status(200)
    .json(userInfo); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// Logout Logic
export const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })
  .status(200)
  .json({ message: "Logout Successful" });
};