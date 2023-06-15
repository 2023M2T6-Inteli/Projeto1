const db = require('../utils/database');

class Grade {
    constructor(value, classId, activityId) {
        this.value = value;
        this.classId = classId;
        this.activityId = activityId;
    }

    static async getAllGrades() {
        const sql = 'SELECT * FROM grade';
        const result = await db.fetch(sql);
        return result;
    }

    async addToDatabase() {
        const sql = 'INSERT INTO grade (grade_value, class_id, activity_id) VALUES (?, ?, ?)';
        const result = await db.run(sql, [this.value, this.classId, this.activityId]);
        this.id = result.lastID;
        return result;
    }

    async fetchFromDatabase() {
        const sql = 'SELECT * FROM grade WHERE grade_id = ?';
        const result = await db.fetch(sql, [this.id]);
        const grade = result[0];
        this.value = grade?.grade_value;
        this.classId = grade?.class_id;
        this.activityId = grade?.activity_id;
        return result;
    }

    async updateInDatabase() {
        const sql = 'UPDATE grade SET grade_value = coalesce(?, grade_value), class_id = coalesce(?, class_id), activity_id = coalesce(?, activity_id) WHERE grade_id = ?';
        const result = await db.run(sql, [this.value, this.classId, this.activityId, this.id]);
        return result;
    }

    async removeFromDatabase() {
        const sql = 'DELETE FROM grade WHERE grade_id = ?';
        const result = await db.run(sql, [this.id]);
        return result;
    }

    static async getLevelBySkill(skillId) {
        const sql = 'SELECT AVG(grade_value) AS average FROM grade JOIN activity ON grade.activity_id = activity.activity_id WHERE activity.skill_id = ?';
        const result = await db.fetch(sql, [skillId]);
        return result[0]?.average || 0;
    }
}

module.exports = Grade;
