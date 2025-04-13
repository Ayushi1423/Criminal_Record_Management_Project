const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '2314',
    database: process.env.DB_NAME || 'crms'
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed: " + err.message);
        process.exit(1); // Exit if connection fails
    } else {
        console.log("Connected to MySQL Database");
    }
});

module.exports = db;
