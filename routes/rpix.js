const express = require('express');
const router = express.Router();
const Source = require('../controllers/rpix');

router.get('/:year',Source.getRPIXbyYear);
router.get('/:year/:month',Source.getRPIXbyMonth);

module.exports = router;