const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

// All analytics routes require authentication
router.use(authMiddleware);

router.get('/dashboard', AnalyticsController.getDashboardData);
router.get('/trends', AnalyticsController.getProductivityTrends);

module.exports = router;
