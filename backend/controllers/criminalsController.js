const Criminal = require('../models/criminalsModel');

exports.getCriminals = (req, res) => {
    Criminal.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addCriminal = (req, res) => {
    const data = req.body;
    Criminal.add(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Criminal added successfully", id: result.insertId });
    });
};
