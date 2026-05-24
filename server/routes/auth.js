const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER Route
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        // මෙතන isAdmin: false කියලා default වැටෙනවා ඔයාගේ Model එකේ තියෙනවා නම්
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. LOGIN Route ✅ (මෙන්න මෙතන තමයි වෙනස් වෙන්න ඕනේ)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: "Invalid email or password!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password!" });

        // JWT Token එකට isAdmin එකත් ඇතුළත් කරන්න (Middleware වලට ඕන වෙනවා)
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET || 'secret123', 
            { expiresIn: '1d' }
        );

        // Password එක නැතිව ඉතිරි දත්ත ටික වෙන් කරගන්න (isAdmin අනිවාර්යයෙන්ම userInfo එකට එනවා)
        const { password: userPassword, ...userInfo } = user.toObject ? user.toObject() : user._doc;

        // Cookie එක විදියට token එක යැවීම
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false, // Localhost නිසා false දාන්න
            sameSite: "lax"
        }).status(200).json(userInfo); // ✅ මෙතන දැන් isAdmin ඇතුළු ඔක්කොම දත්ත Frontend එකට යනවා
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. LOGOUT Route
router.post('/logout', (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "lax"
    })
    .status(200)
    .json({ message: "Logged out successfully!" });
});

module.exports = router;