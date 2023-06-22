const db = require('../utils/database'); //Importa o módulo

class Grade {
    constructor(value, classId, activityId) { //inicializando as propriedades do objeto
        this.value = value;
        this.classId = classId;
        this.activityId = activityId;
    }

    // Função estática para obter todas as notas do banco de dados
    static async getAllGrades() {
        const sql = 'SELECT * FROM grade';
        const result = await db.fetch(sql);
        return result;
    }

    // Método assíncrono para adicionar a nota ao banco de dados
    async addToDatabase() {
        const sql = 'INSERT INTO grade (grade_value, class_id, activity_id) VALUES (?, ?, ?)';
        const result = await db.run(sql, [this.value, this.classId, this.activityId]);
        this.id = result.lastID;
        return result;
    }

    // Método assíncrono para buscar a nota no banco de dados
    async fetchFromDatabase() {
        const sql = 'SELECT * FROM grade WHERE grade_id = ?';
        const result = await db.fetch(sql, [this.id]);
        const grade = result[0];
        this.value = grade?.grade_value;
        this.classId = grade?.class_id;
        this.activityId = grade?.activity_id;
        return result;
    }

    // Atualiza uma nota existente no banco de dados
    async updateInDatabase() {
        const sql = 'UPDATE grade SET grade_value = coalesce(?, grade_value), class_id = coalesce(?, class_id), activity_id = coalesce(?, activity_id) WHERE grade_id = ?';
        const result = await db.run(sql, [this.value, this.classId, this.activityId, this.id]);
        return result;
    }

    // Remove uma nota do banco de dados
    async removeFromDatabase() {
        const sql = 'DELETE FROM grade WHERE grade_id = ?';
        const result = await db.run(sql, [this.id]);
        return result;
    }

    // Método estático que retorna a média das notas para uma determinada habilidade com base no ID da habilidade fornecido
    static async getLevelBySkill(skillId) {
        const sql = 'SELECT AVG(grade_value) AS average FROM grade JOIN activity ON grade.activity_id = activity.activity_id WHERE activity.skill_id = ?';
        const result = await db.fetch(sql, [skillId]);
        return result[0]?.average || 0;
    }
}

// Exporta a classe como um módulo
module.exports = Grade;
