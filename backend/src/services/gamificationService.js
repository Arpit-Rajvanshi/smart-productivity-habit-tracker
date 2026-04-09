const db = require('../config/db');

/**
 * Service to handle experience points, leveling, and badges.
 */
class GamificationService {
    /**
     * Calculate and update user XP/Level after an activity.
     * @param {number} userId 
     * @param {number} xpAmount 
     */
    static async addXp(userId, xpAmount) {
        const query = 'SELECT xp, level FROM users WHERE id = $1';
        const { rows } = await db.query(query, [userId]);
        if (rows.length === 0) return null;

        let { xp, level } = rows[0];
        xp += xpAmount;

        // Level up logic: Level increases every 1000 XP
        const newLevel = Math.floor(xp / 1000) + 1;
        const leveledUp = newLevel > level;

        await db.query(
            'UPDATE users SET xp = $1, level = $2, updated_at = NOW() WHERE id = $3',
            [xp, newLevel, userId]
        );

        return { xp, level: newLevel, leveledUp };
    }

    /**
     * Internal logic to check and award badges based on triggers.
     */
    static async checkBadges(userId, triggerType, triggerValue) {
        // Find badges the user doesn't have yet that match criteria
        const query = `
            SELECT b.* FROM badges b
            WHERE b.criteria_type = $1 
            AND b.criteria_value <= $2
            AND b.id NOT IN (SELECT badge_id FROM user_badges WHERE user_id = $3)
        `;
        const { rows: eligibleBadges } = await db.query(query, [triggerType, triggerValue, userId]);

        for (const badge of eligibleBadges) {
            await db.query(
                'INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                [userId, badge.id]
            );
        }

        return eligibleBadges;
    }

    /**
     * Update streaks for a habit.
     */
    static async updateHabitStreak(habitId) {
        const query = `
            SELECT h.id, h.current_streak, h.best_streak, 
            MAX(hh.check_in_date) as last_checkin
            FROM habits h
            LEFT JOIN habit_history hh ON h.id = hh.habit_id
            WHERE h.id = $1
            GROUP BY h.id
        `;
        const { rows } = await db.query(query, [habitId]);
        if (rows.length === 0) return null;

        const habit = rows[0];
        const lastCheckin = habit.last_checkin ? new Date(habit.last_checkin) : null;
        const today = new Date();
        today.setHours(0,0,0,0);

        let newStreak = habit.current_streak;
        
        if (!lastCheckin) {
            newStreak = 1;
        } else {
            const diffTime = Math.abs(today - lastCheckin);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                newStreak += 1; // Consecutive day
            } else if (diffDays > 1) {
                newStreak = 1; // Streak broken
            } else {
                return habit; // Already checked in today
            }
        }

        const newBest = Math.max(newStreak, habit.best_streak);
        
        await db.query(
            'UPDATE habits SET current_streak = $1, best_streak = $2 WHERE id = $3',
            [newStreak, newBest, habitId]
        );

        return { currentStake: newStreak, bestStreak: newBest };
    }
}

module.exports = GamificationService;
