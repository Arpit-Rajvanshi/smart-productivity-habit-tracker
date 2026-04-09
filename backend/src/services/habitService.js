const db = require('../config/db');
const GamificationService = require('./gamificationService');

class HabitService {
    static async getHabitsWithStatus(userId) {
        const query = `
            SELECT h.*, 
            EXISTS(SELECT 1 FROM habit_history hh WHERE hh.habit_id = h.id AND hh.check_in_date = CURRENT_DATE) as is_completed_today
            FROM habits h
            WHERE h.user_id = $1
            ORDER BY h.created_at DESC
        `;
        const { rows } = await db.query(query, [userId]);
        return rows;
    }

    static async checkIn(userId, habitId, status = 'Completed') {
        const today = new Date().toISOString().split('T')[0];
        
        // 1. Log History
        const historyQuery = `
            INSERT INTO habit_history (habit_id, check_in_date, status)
            VALUES ($1, $2, $3)
            ON CONFLICT (habit_id, check_in_date) DO UPDATE SET status = $3
            RETURNING *
        `;
        const { rows: history } = await db.query(historyQuery, [habitId, today, status]);

        // 2. Update Streaks if completed
        let streakData = null;
        if (status === 'Completed') {
            streakData = await GamificationService.updateHabitStreak(habitId);
            // 3. Award XP
            await GamificationService.addXp(userId, 15);
        }

        return { history: history[0], streakData };
    }
}

module.exports = HabitService;
