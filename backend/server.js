const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Secret key for JWT authentication
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    console.error("❌ JWT_SECRET is missing in the .env file.");
    process.exit(1); // Stop the server if the secret key is missing
}

// ✅ Serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html')); // Ensure correct path
});

// ✅ User Login API
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required!" });
    }

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (results.length === 0) {
            console.log(`❌ No user found with username: ${username}`);
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = results[0];
        console.log("✅ User fetched from DB:", user);

        // Check if passwords match
        if (password !== user.password) {
            console.log(`❌ Password mismatch: Entered (${password}) vs Stored (${user.password})`);
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        console.log(`✅ Login successful for ${username}`);
        res.json({ message: "Login successful", token });
    });
});

// ✅ Add Criminal Record API
app.post('/criminals', authenticateToken, (req, res) => {
    const {
        name, age, gender, crime_type, crime_severity, arrest_date,
        arrest_location, officer_in_charge, case_status, prison_name,
        release_date, description
    } = req.body;

    if (!name || !age || !gender || !crime_type || !crime_severity || 
        !arrest_date || !arrest_location || !officer_in_charge || 
        !case_status || !description) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
        INSERT INTO criminals 
        (name, age, gender, crime_type, crime_severity, arrest_date, 
         arrest_location, officer_in_charge, case_status, prison_name, 
         release_date, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        name, age, gender, crime_type, crime_severity, arrest_date,
        arrest_location, officer_in_charge, case_status, prison_name || null,
        release_date || null, description
    ], (err, result) => {
        if (err) {
            console.error("❌ Database Insert Error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.json({ message: "Criminal added successfully", id: result.insertId });
    });
});

// ✅ Get All Criminal Records API
app.get('/criminals', authenticateToken, (req, res) => {
    db.query("SELECT * FROM criminals", (err, results) => {
        if (err) {
            console.error("❌ Database Fetch Error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.json(results);
    });
});

// ✅ Middleware for JWT authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: "Access denied! Token missing." });

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"
    if (!token) return res.status(403).json({ error: "Invalid token format!" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token!" });
        req.user = user;
        next();
    });
}

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
