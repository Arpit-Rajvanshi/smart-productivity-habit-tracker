const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

/**
 * Authentication Controller
 * Handles user registration and dynamic JWT creation.
 */
class AuthController {
    static async register(req, res, next) {
        try {
            const { email, password, full_name } = req.body;

            // 1. Check if user exists
            const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (userCheck.rows.length > 0) {
                const error = new Error('User already exists');
                error.statusCode = 400;
                throw error;
            }

            // 2. Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 3. Create User
            const newUser = await db.query(
                `INSERT INTO users (email, password_hash, full_name) 
                 VALUES ($1, $2, $3) RETURNING id, email, full_name`,
                [email, hashedPassword, full_name]
            );

            // 4. Generate Token
            const token = jwt.sign(
                { id: newUser.rows[0].id, email: newUser.rows[0].email },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );

            res.status(201).json({
                success: true,
                token: token,
                user: newUser.rows[0]
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // 1. Find User
            const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (rows.length === 0) {
                const error = new Error('Invalid credentials');
                error.statusCode = 401;
                throw error;
            }

            const user = rows[0];

            // 2. Verify Password
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                const error = new Error('Invalid credentials');
                error.statusCode = 401;
                throw error;
            }

            // 3. Generate Token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );

            res.json({
                success: true,
                token: token,
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    xp: user.xp,
                    level: user.level
                }
            });
        } catch (err) {
            next(err);
        }
    }

    static async testConnection(req, res, next) {
        try {
            const { rows } = await db.query('SELECT NOW()');
            res.json({
                success: true,
                message: 'Database connection verified!',
                time: rows[0].now,
                env: {
                    node_env: process.env.NODE_ENV,
                    has_db_url: !!process.env.DATABASE_URL
                }
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
