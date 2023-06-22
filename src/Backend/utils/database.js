const sqlite3 = require('sqlite3').verbose();
const DATABASE_NAME = 'data/database.sqlite';

class Database {

    constructor(databaseName) {
        this.db = null;
        this.connected = false;
        this.databaseName = databaseName;
    }

    connect() { // Estabelece conexão com o banco de dados
        return new Promise((resolve, reject) => {
           // Cria uma nova instância do banco de dados SQLite
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
            // Fecha a conexão com o banco de dados
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
            // Executa uma consulta SQL e retorna os resultados
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
            // Executa uma operação SQL (como inserção, atualização ou exclusão) e retorna o último ID inserido e o número de alterações
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

// Exporta uma instância da classe Database com o nome do banco de dados definido na constante DATABASE_NAME
module.exports = new Database(DATABASE_NAME);
