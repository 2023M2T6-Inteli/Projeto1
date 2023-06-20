const db = require('../utils/database');

function databaseConnection(req, res, next) {
    if (!req.url.includes('/api/')) {
        return next();
    }

    if (db.connected) {
        return next();
    }

    db.connect();

    res.on('finish', () => db.close());

    next();
}

module.exports = databaseConnection;