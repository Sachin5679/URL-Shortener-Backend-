const express = require('express');
const { generateShort, fetchAnalytics } = require("../controllers/url")
const router = express.Router();

router.post('/', generateShort);
router.get('/analytics/:shortId', fetchAnalytics)

module.exports = router;