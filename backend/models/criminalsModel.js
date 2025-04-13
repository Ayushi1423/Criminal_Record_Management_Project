const db = require('../database');

const Criminal = {
    getAll: (callback) => {
        db.query("SELECT * FROM criminals", callback);
    },

    add: (data, callback) => {
        const sql = `INSERT INTO criminals 
        (name, age, gender, crime_type, crime_severity, arrest_date, arrest_location, officer_in_charge, 
        case_status, description, prison_name, release_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        db.query(sql, [data.name, data.age, data.gender, data.crime_type, data.crime_severity, 
        data.arrest_date, data.arrest_location, data.officer_in_charge, data.case_status, 
        data.description, data.prison_name, data.release_date], callback);
    }
};

module.exports = Criminal;
