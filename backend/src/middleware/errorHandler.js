/**
 * Centralized Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        internal: err.message, // Explicitly send the internal message
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;
