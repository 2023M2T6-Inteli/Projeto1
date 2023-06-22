const db = require('../utils/database'); // Importa o módulo de banco de dados

class Activity {
    constructor(name, description, skillId, teacherId) {
        this.name = name; // Atribui o parâmetro name à propriedade name da instância
        this.description = description; // Atribui o parâmetro description à propriedade description da instância
        this.skillId = skillId; // Atribui o parâmetro skillId à propriedade skillId da instância
        this.teacherId = teacherId; // Atribui o parâmetro teacherId à propriedade teacherId da instância
    }

    // Função estática para obter todas as atividades
    static async getAllActivities() {
        const sql = 'SELECT * FROM activity';
        const result = await db.fetch(sql);
        return result;
    }

    // Função assíncrona para adicionar a atividade ao banco de dados
    async addToDatabase() {
        const sql = 'INSERT INTO activity (activity_name, activity_description, skill_id, teacher_id) VALUES (?, ?, ?, ?)';
        const result = await db.run(sql, [this.name, this.description, this.skillId, this.teacherId]);
        this.id = result.lastID;
        return result;
    }

    // Função assíncrona para buscar a atividade no banco de dados
    async fetchFromDatabase() {
        const sql = 'SELECT * FROM activity WHERE activity_id = ?';
        const result = await db.fetch(sql, [this.id]);
        const activity = result[0];
        this.name = activity?.activity_name;
        this.description = activity?.activity_description;
        this.skillId = activity?.skill_id;
        this.teacherId = activity?.teacher_id;
        return result;
    }

    // Função assíncrona para atualizar a atividade no banco de dados
    async updateInDatabase() {
        const sql = 'UPDATE activity SET activity_name = coalesce(?, activity_name), activity_description = coalesce(?, activity_description), skill_id = coalesce(?, skill_id), teacher_id = coalesce(?, teacher_id) WHERE activity_id = ?';
        const result = await db.run(sql, [this.name, this.description, this.skillId, this.teacherId, this.id]);
        return result;
    }

    // Função assíncrona para remover a atividade do banco de dados
    async removeFromDatabase() {
        const sql = 'DELETE FROM activity WHERE activity_id = ?';
        const result = await db.run(sql, [this.id]);
        return result;
    }
}

// Exporta a classe Activity para uso em outros arquivos
module.exports = Activity;
