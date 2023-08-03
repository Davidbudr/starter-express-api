const express = require('express');
const router = express.Router();
const Source = require('../controllers/rpi');

router.get('/:year',Source.getRPIbyYear);
router.get('/:year/:month',Source.getRPIbyMonth);

module.exports = router;