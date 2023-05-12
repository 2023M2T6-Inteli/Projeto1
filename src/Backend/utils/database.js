const sqlite3 = require('sqlite3').verbose();
const DATABASE_NAME = 'data/database.sqlite';

class Database {
    static connect(databaseName = DATABASE_NAME) {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(databaseName, (error) => {
                if (error) {
                    console.error('Erro na conexão com o banco de dados:', error);
                    reject(error);
                } else {
                    console.log('Conexão com o banco de dados estabelecida');
                    resolve();
                }
            });
        });
    }

    static close() {
        return new Promise((resolve, reject) => {
            this.db.close((error) => {
                if (error) {
                    console.error('Erro ao fechar a conexão com o banco de dados:', error);
                    reject(error);
                } else {
                    console.log('Conexão com o banco de dados fechada');
                    resolve();
                }
            });
        });
    }

    static fetch(sql, params = []) {
        this.connect();
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (error, rows) => {
                if (error) {
                    console.error('Erro ao executar a consulta:', error);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
            this.close();
        });
    }

    static run(sql, params = []) {
        this.connect();
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (error) {
                if (error) {
                    console.error('Erro ao executar a operação:', error);
                    reject(error);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
            this.close();
        });
    }
}

module.exports = Database;
