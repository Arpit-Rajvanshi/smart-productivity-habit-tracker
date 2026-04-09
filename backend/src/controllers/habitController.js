const HabitService = require('../services/habitService');

class HabitController {
    static async getHabits(req, res, next) {
        try {
            const { userId } = req.user;
            const habits = await HabitService.getHabitsWithStatus(userId);
            res.json({ success: true, data: habits });
        } catch (err) {
            next(err);
        }
    }

    static async checkIn(req, res, next) {
        try {
            const { userId } = req.user;
            const { habitId, status } = req.body;
            const result = await HabitService.checkIn(userId, habitId, status);
            res.json({ success: true, data: result });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = HabitController;
