const db = require('../utils/database');

class Class {
    constructor(name, schoolYear, school, teacherId) {
        this.name = name;
        this.schoolYear = schoolYear;
        this.school = school;
        this.teacherId = teacherId;
    }

    static async getAllClasses() {
        const sql = 'SELECT * FROM class';
        const result = await db.fetch(sql);
        return result;
    }

    async addToDatabase() {
        const sql = 'INSERT INTO class (class_name, school_year, school, teacher_id) VALUES (?, ?, ?, ?)';
        const result = await db.run(sql, [this.name, this.schoolYear, this.school, this.teacherId]);
        this.id = result.lastID;
    }

    async fetchFromDatabase() {
        const sql = 'SELECT * FROM class WHERE class_id = ?';
        const result = await db.fetch(sql, [this.id]);
        const _class = result[0];
        this.name = _class?.class_name;
        this.schoolYear = _class?.school_year;
        this.school = _class?.school;
        this.teacherId = _class?.teacher_id;
        return result;
    }

    async updateInDatabase() {
        const sql = 'UPDATE class SET class_name = coalesce(?, class_name), school_year = coalesce(?, school_year), school = coalesce(?, school), teacher_id = coalesce(?, teacher_id) WHERE class_id = ?';
        const result = await db.run(sql, [this.name, this.schoolYear, this.school, this.teacherId, this.id]);
        return result;
    }

    async removeFromDatabase() {
        const sql = 'DELETE FROM class WHERE class_id = ?';
        const result = await db.run(sql, [this.id]);
        return result;
    }

    async getStudents() {
        const sql = 'SELECT * FROM student WHERE class_id = ?';
        const result = await db.fetch(sql, [this.id]);
        return result;
    }
}

module.exports = Class;