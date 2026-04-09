const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// All task routes require authentication
router.use(authMiddleware);

router.get('/', TaskController.getTasks);
router.post('/', TaskController.createTask);
router.patch('/:id/complete', TaskController.completeTask);

module.exports = router;
