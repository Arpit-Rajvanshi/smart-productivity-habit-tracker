const TaskService = require('../services/taskService');

class TaskController {
    static async getTasks(req, res, next) {
        try {
            const { userId } = req.user; // Assuming JWT middleware populates this
            const tasks = await TaskService.getAllUserTasks(userId, req.query);
            res.json({ success: true, data: tasks });
        } catch (err) {
            next(err);
        }
    }

    static async createTask(req, res, next) {
        try {
            const { userId } = req.user;
            const task = await TaskService.createTask(userId, req.body);
            res.status(201).json({ success: true, data: task });
        } catch (err) {
            next(err);
        }
    }

    static async completeTask(req, res, next) {
        try {
            const { userId } = req.user;
            const { id } = req.params;
            const task = await TaskService.completeTask(userId, id);
            if (!task) {
                const error = new Error('Task not found');
                error.statusCode = 404;
                throw error;
            }
            res.json({ success: true, data: task });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TaskController;
