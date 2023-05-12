const db = require('../utils/database');

class Teacher {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async getAllTeachers() {
        const sql = 'SELECT * FROM teacher';
        const result = await db.fetch(sql);
        return result;
    }

    async addToDatabase() {
        const sql = 'INSERT INTO teacher (teacher_name, email, teacher_password) VALUES (?, ?, ?)';
        const result = await db.run(sql, [this.name, this.email, this.password]);
        this.id = result.lastID;
        return result;
    }

    async fetchFromDatabase() {
        const sql = 'SELECT * FROM teacher WHERE teacher_id = ?';
        const result = await db.fetch(sql, [this.id]);
        const teacher = result[0];
        this.name = teacher?.teacher_name;
        this.email = teacher?.email;
        this.password = teacher?.teacher_password;
        return result;
    }

    async updateInDatabase() {
        const sql = 'UPDATE teacher SET teacher_name = coalesce(?, teacher_name), email = coalesce(?, email), teacher_password = coalesce(?, teacher_password) WHERE teacher_id = ?';
        const result = await db.run(sql, [this.name, this.email, this.password, this.id]);
        return result;
    }

    async removeFromDatabase() {
        const sql = 'DELETE FROM teacher WHERE teacher_id = ?';
        const result = await db.run(sql, [this.id]);
        return result;
    }

    async exists() {
        const sql = 'SELECT * FROM teacher WHERE email = ?';
        const result = await db.fetch(sql, [this.email]);
        return result.length > 0;
    }

    async getClasses() {
        const sql = 'SELECT * FROM class WHERE teacher_id = ?';
        const result = await db.fetch(sql, [this.id]);
        return result;
    }

    async getStudents() {
        const sql =
            `SELECT *
            FROM student
            JOIN class ON student.class_id = class.class_id
            WHERE class.teacher_id = ?
            `;

        const result = await db.fetch(sql, [this.id]);
        return result;
    }
}

module.exports = Teacher;
