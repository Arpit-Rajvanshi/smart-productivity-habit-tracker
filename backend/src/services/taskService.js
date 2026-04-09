const db = require('../config/db');

class TaskService {
    static async getAllUserTasks(userId, filters = {}) {
        let query = 'SELECT t.*, c.name as category_name, c.color as category_color FROM tasks t LEFT JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1';
        const params = [userId];

        if (filters.status) {
            query += ` AND t.status = $${params.length + 1}`;
            params.push(filters.status);
        }

        if (filters.priority) {
            query += ` AND t.priority = $${params.length + 1}`;
            params.push(filters.priority);
        }

        query += ' ORDER BY t.due_date ASC NULLS LAST, t.created_at DESC';
        const { rows } = await db.query(query, params);
        return rows;
    }

    static async createTask(userId, taskData) {
        const { title, description, category_id, priority, due_date, estimated_minutes } = taskData;
        const query = `
            INSERT INTO tasks (user_id, title, description, category_id, priority, due_date, estimated_minutes)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const { rows } = await db.query(query, [userId, title, description, category_id, priority, due_date, estimated_minutes]);
        return rows[0];
    }

    static async completeTask(userId, taskId) {
        const query = `
            UPDATE tasks 
            SET status = 'Done', completed_at = NOW() 
            WHERE id = $1 AND user_id = $2 
            RETURNING *
        `;
        const { rows } = await db.query(query, [taskId, userId]);
        return rows[0];
    }
}

module.exports = TaskService;
