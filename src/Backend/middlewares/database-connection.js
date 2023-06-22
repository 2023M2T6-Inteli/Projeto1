const db = require('../utils/database');

function databaseConnection(req, res, next) {
    // Verifica se a URL não contém '/api/'
    // Se não contiver, passa para o próximo middleware
    if (!req.url.includes('/api/')) {
        return next();
    }

    // Verifica se já está conectado ao banco de dados
    // Se já estiver conectado, passa para o próximo middleware
    if (db.connected) {
        return next();
    }

    // Se não estiver conectado, estabelece a conexão com o banco de dados
    db.connect();

    // Ao finalizar a resposta, fecha a conexão com o banco de dados
    // res.on('finish', () => db.close());

    // Chama o próximo middleware
    next();
}

module.exports = databaseConnection;