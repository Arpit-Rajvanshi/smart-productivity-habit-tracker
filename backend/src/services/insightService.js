const db = require('../config/db');

class InsightService {
    /**
     * Analyze user data to generate smart productivity tips.
     */
    static async generateInsights(userId) {
        const insights = [];

        // 1. Check for missing habits on specific days
        const patternQuery = `
            SELECT EXTRACT(DOW FROM check_in_date) as dow, COUNT(*) as completions
            FROM habit_history hh
            JOIN habits h ON hh.habit_id = h.id
            WHERE h.user_id = $1 AND hh.status = 'Completed'
            GROUP BY dow
            ORDER BY completions ASC
            LIMIT 1
        `;
        const { rows: patterns } = await db.query(patternQuery, [userId]);
        
        if (patterns.length > 0) {
            const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
            const weakestDay = days[parseInt(patterns[0].dow)];
            insights.push({
                message: `You tend to miss habits on ${weakestDay}. Try setting an extra reminder!`,
                type: 'Pattern'
            });
        }

        // 2. Check for high-productivity windows (from Focus Sessions)
        const focusQuery = `
            SELECT EXTRACT(HOUR FROM completed_at) as hour, COUNT(*) as count
            FROM focus_sessions
            WHERE user_id = $1
            GROUP BY hour
            ORDER BY count DESC
            LIMIT 1
        `;
        const { rows: focusData } = await db.query(focusQuery, [userId]);
        if (focusData.length > 0) {
            const peakHour = focusData[0].hour;
            insights.push({
                message: `Your peak focus time is around ${peakHour}:00. Schedule your critical tasks then!`,
                type: 'Tip'
            });
        }

        // Save generated insights to DB and return
        for (const insight of insights) {
            await db.query(
                'INSERT INTO insights (user_id, message, type) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
                [userId, insight.message, insight.type]
            );
        }

        return insights;
    }

    static async getLatestInsights(userId) {
        const { rows } = await db.query(
            'SELECT * FROM insights WHERE user_id = $1 ORDER BY created_at DESC LIMIT 3',
            [userId]
        );
        return rows;
    }
}

module.exports = InsightService;
