const InsightService = require('../services/insightService');
const db = require('../config/db');

class AnalyticsController {
    static async getDashboardData(req, res, next) {
        try {
            const { userId } = req.user;
            
            // 1. Get basic stats
            const statsQuery = `
                SELECT 
                    (SELECT COUNT(*) FROM tasks WHERE user_id = $1 AND status = 'Todo') as pending_count,
                    (SELECT COUNT(*) FROM tasks WHERE user_id = $1 AND status = 'Done') as completed_count,
                    (SELECT xp FROM users WHERE id = $1) as current_xp,
                    (SELECT level FROM users WHERE id = $1) as current_level
            `;
            const { rows: stats } = await db.query(statsQuery, [userId]);

            // 2. Get insights
            await InsightService.generateInsights(userId);
            const insights = await InsightService.getLatestInsights(userId);

            res.json({
                success: true,
                data: {
                    stats: stats[0],
                    insights: insights
                }
            });
        } catch (err) {
            next(err);
        }
    }

    static async getProductivityTrends(req, res, next) {
        try {
            const { userId } = req.user;
            const query = `
                SELECT DATE_TRUNC('day', completed_at) as day, COUNT(*) as count
                FROM tasks
                WHERE user_id = $1 AND completed_at > NOW() - INTERVAL '7 days'
                GROUP BY day
                ORDER BY day ASC
            `;
            const { rows } = await db.query(query, [userId]);
            res.json({ success: true, data: rows });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AnalyticsController;
