/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const propertyRoute = require("./routes/propertyRoutes");

// 1. Middleware
app.use(express.json()); 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//app.use(cors()); 
app.use(cookieParser());
app.use("/api/properties", propertyRoute); 

// 2. MongoDB connecting
mongoose.connect('mongodb://127.0.0.1:27017/estatePro')
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 3. සරල Route එකක්
app.get('/', (req, res) => {
    res.send('Server is Running!');
});

// 4. Auth Routes සම්බන්ධ කිරීම (අනිවාර්යයෙන්ම මෙය ක්‍රියාත්මක විය යුතුයි)
// මෙය ක්‍රියාත්මක වීමට නම්, server/routes/auth.js ෆයිල් එකක් තිබිය යුතුය.
app.use('/api/auth', require('./routes/auth')); 

// 5. සර්වර් එක පටන් ගන්න
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});*/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const propertyRoute = require("./routes/propertyRoutes");
// 1. Middleware
// --- මෙහිදී limit එක වැඩි කර ඇත (Base64 images සඳහා අත්‍යවශ්‍යයි) ---
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS setup එක (Frontend එක සමඟ සම්බන්ධ වීමට)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());
app.use("/api/properties", propertyRoute); 

// 2. MongoDB connecting
mongoose.connect('mongodb://127.0.0.1:27017/estatePro')
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 3. සරල Route එකක්
app.get('/', (req, res) => {
    res.send('Server is Running!');
});

// 4. Auth Routes සම්බන්ධ කිරීම
app.use('/api/auth', require('./routes/auth')); 

// 5. සර්වර් එක පටන් ගන්න
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});