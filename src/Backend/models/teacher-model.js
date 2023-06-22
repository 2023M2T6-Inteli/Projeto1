const db = require('../utils/database');

class Teacher {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Método estático que recupera todos os professores do banco de dados.
    static async getAllTeachers() {
        const sql = 'SELECT * FROM teacher';
        const result = await db.fetch(sql);
        return result;
    }

    // Método que insere um novo professor no banco de dados.
    async addToDatabase() {
        const sql = 'INSERT INTO teacher (teacher_name, email, teacher_password) VALUES (?, ?, ?)';
        const result = await db.run(sql, [this.name, this.email, this.password]);
        this.id = result.lastID;
        return result;
    }

    // Método que busca as informações do professor no banco de dados com base no seu ID.
    async fetchFromDatabase() {
        const sql = 'SELECT * FROM teacher WHERE teacher_id = ?';
        const result = await db.fetch(sql, [this.id]);
        const teacher = result[0];
        this.name = teacher?.teacher_name;
        this.email = teacher?.email;
        this.password = teacher?.teacher_password;
        return result;
    }

    // Método que busca as informações do professor no banco de dados com base no seu email.
    async fetchFromDatabaseByEmail() {
        const sql = 'SELECT * FROM teacher WHERE email = ?';
        const result = await db.fetch(sql, [this.email]);
        const teacher = result[0];
        this.id = teacher?.teacher_id;
        this.name = teacher?.teacher_name;
        this.email = teacher?.email;
        this.password = teacher?.teacher_password;
        return result;
    }

    // Método que atualiza as informações do professor no banco de dados.
    async updateInDatabase() {
        const sql = 'UPDATE teacher SET teacher_name = coalesce(?, teacher_name), email = coalesce(?, email), teacher_password = coalesce(?, teacher_password) WHERE teacher_id = ?';
        const result = await db.run(sql, [this.name, this.email, this.password, this.id]);
        return result;
    }

    // Método que remove o professor do banco de dados.
    async removeFromDatabase() {
        const sql = 'DELETE FROM teacher WHERE teacher_id = ?';
        const result = await db.run(sql, [this.id]);
        return result;
    }

    // Método que verifica se o professor existe no banco de dados com base no seu email.
    async exists() {
        const sql = 'SELECT * FROM teacher WHERE email = ?';
        const result = await db.fetch(sql, [this.email]);
        return result.length > 0;
    }

    // Método que obtém as classes associadas ao professor no banco de dados.
    async getClasses() {
        const sql = 'SELECT * FROM class WHERE teacher_id = ?';
        const result = await db.fetch(sql, [this.id]);
        return result;
    }

    // Método que obtém as atividades associadas ao professor no banco de dados.
    async getActivities() {
        const sql = 'SELECT * FROM activity WHERE teacher_id = ?';
        const result = await db.fetch(sql, [this.id]);
        return result;
    }

    // Método que verifica se as credenciais do professor (email e senha) correspondem a algum registro na tabela "teacher" do banco de dados.
    async canLogin() {
        const sql = 'SELECT * FROM teacher WHERE email = ? AND teacher_password = ?';
        const result = await db.fetch(sql, [this.email, this.password]);
        console.log(result);
        return result.length > 0;
    }
}

// Exporta a classe Teacher
module.exports = Teacher;
