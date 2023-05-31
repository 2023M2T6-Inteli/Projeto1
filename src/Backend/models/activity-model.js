const db = require('../utils/database');

class Activity {
    constructor(name, description, skillId, teacherId) {
        this.name = name;
        this.description = description;
        this.skillId = skillId;
        this.teacherId = teacherId;
    }

    static async getAllActivities() {
        const sql = 'SELECT * FROM activity';
        const result = await db.fetch(sql);
        return result;
    }

    async addToDatabase() {
        const sql = 'INSERT INTO activity (activity_name, activity_description, skill_id, teacher_id) VALUES (?, ?, ?, ?)';
        const result = await db.run(sql, [this.name, this.description, this.skillId, this.teacherId]);
        this.id = result.lastID;
        return result;
    }

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

    async updateInDatabase() {
        const sql = 'UPDATE activity SET activity_name = coalesce(?, activity_name), activity_description = coalesce(?, activity_description), skill_id = coalesce(?, skill_id), teacher_id = coalesce(?, teacher_id) WHERE activity_id = ?';
        const result = await db.run(sql, [this.name, this.description, this.skillId, this.teacherId, this.id]);
        return result;
    }

    async removeFromDatabase() {
        const sql = 'DELETE FROM activity WHERE activity_id = ?';
        const result = await db.run(sql, [this.id]);
        return result;
    }
}

module.exports = Activity;
