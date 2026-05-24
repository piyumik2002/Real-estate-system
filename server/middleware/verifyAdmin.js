export const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Only admin can perform this action!" });
  }
  next();
};

/*import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  // 1. මුලින්ම Cookie එකේ Token එක තියෙනවාද බලනවා
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  // 2. Token එක නිවැරදිද කියා පරීක්ෂා කරනවා
  jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });

    // 3. දැන් බලනවා ඒ User ඇත්තටම Admin කෙනෙක්ද කියලා
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Only admin can perform this action!" });
    }

    // හැමදේම හරි නම් ඉදිරියට යනවා
    req.user = user;
    next();
  });
};*/