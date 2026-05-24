import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Cookie එකෙන් token එක ලබා ගැනීම
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  // Token එක පරීක්ෂා කිරීම
  jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });

    // පරීක්ෂා කළ දත්ත req.user එකට දානවා (මෙතන isAdmin දත්තයත් තියෙනවා)
    req.user = user;
    next(); // ඊළඟ Middleware එකට (verifyAdmin) යවනවා
  });
};