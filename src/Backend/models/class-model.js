const db = require('../utils/database');

class Class {
    constructor(name, schoolYear, school_id, teacherId) {
        this.name = name;
        this.schoolYear = schoolYear;
        this.school_id = school_id;
        this.teacherId = teacherId;
    }

    // Método estático para obter todas as classes do banco de dados
    static async getAllClasses() {
        const sql = 'SELECT * FROM class';
        const result = await db.fetch(sql);
        return result;
    }

    // Método para adicionar a instância da classe ao banco de dados
    async addToDatabase() {
        const sql = 'INSERT INTO class (class_name, school_year, school_id, teacher_id) VALUES (?, ?, ?, ?)';
        const result = await db.run(sql, [this.name, this.schoolYear, this.school_id, this.teacherId]);
        this.id = result.lastID; // Atribui o ID gerado pelo banco de dados à propriedade 'id' da instância
        return result;
    }

    // Método para buscar os dados da classe no banco de dados
    async fetchFromDatabase() {
        const sql = 'SELECT * FROM class WHERE class_id = ?';
        const result = await db.fetch(sql, [this.id]);
        const _class = result[0];
        this.name = _class?.class_name; // Atualiza as propriedades da instância com os valores retornados do banco de dados
        this.schoolYear = _class?.school_year;
        this.school_id = _class?.school;
        this.teacherId = _class?.teacher_id;
        return result;
    }

    // Método para atualizar as informações da classe no banco de dados
    async updateInDatabase() {
        const sql = 'UPDATE class SET class_name = coalesce(?, class_name), school_year = coalesce(?, school_year), school_id = coalesce(?, school_id), teacher_id = coalesce(?, teacher_id) WHERE class_id = ?';
        const result = await db.run(sql, [this.name, this.schoolYear, this.school_id, this.teacherId, this.id]);
        return result;
    }

    // Método para remover a entrada da classe do banco de dados
    async removeFromDatabase() {
        const sql = 'DELETE FROM class WHERE class_id = ?';
        const result = await db.run(sql, [this.id]);
        return result;
    }

    // Método para obter todas as notas associadas à classe
    async getGrades() {
        const sql = 'SELECT * FROM grade WHERE class_id = ?';
        const result = await db.fetch(sql, [this.id]);
        return result;
    }
}

module.exports = Class;