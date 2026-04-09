const express = require('express');
const router = express.Router();
const HabitController = require('../controllers/habitController');
const authMiddleware = require('../middleware/authMiddleware');

// All habit routes require authentication
router.use(authMiddleware);

router.get('/', HabitController.getHabits);
router.post('/checkin', HabitController.checkIn);

module.exports = router;
