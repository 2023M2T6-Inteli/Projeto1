const sqlite3 = require('sqlite3').verbose();
const DATABASE_NAME = 'data/database.sqlite';

class Database {

    constructor(databaseName) {
        this.db = null;
        this.connected = false;
        this.databaseName = databaseName;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.databaseName, (error) => {
                if (error) {
                    console.error('Erro na conexão com o banco de dados:', error);
                    reject(error);
                }
                console.log('Conexão com o banco de dados estabelecida');
                resolve();
                this.connected = true;
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((error) => {
                if (error) {
                    console.error('Erro ao fechar a conexão com o banco de dados:', error);
                    reject(error);
                }
                console.log('Conexão com o banco de dados fechada');
                resolve();
                this.connected = false;

            });
        });
    }

    fetch(sql, params = []) {
        console.log(this.db);
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (error, rows) => {
                if (error) {
                    console.error('Erro ao executar a consulta:', error);
                    reject(error);
                }
                resolve(rows);

            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (error) {
                if (error) {
                    console.error('Erro ao executar a operação:', error);
                    reject(error);
                }
                resolve({ lastID: this.lastID, changes: this.changes });

            });
        });
    }
}

module.exports = new Database(DATABASE_NAME);
