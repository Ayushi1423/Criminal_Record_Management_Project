const express = require('express');
const router = express.Router();
const criminalsController = require('../controllers/criminalsController');

router.get('/', criminalsController.getCriminals);
router.post('/', criminalsController.addCriminal);

module.exports = router;
