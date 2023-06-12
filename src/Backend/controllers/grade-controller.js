const Grade = require('../models/grade-model');

class GradeController {
    async getAllGrades(req, res) {
        const grades = await Grade.getAllGrades();
        res.json(grades);
    }

    async getGrade(req, res) {
        const grade = new Grade();
        grade.id = req.params.grade_id;
        await grade.fetchFromDatabase();

        if (!grade.value) {
            res.status(404).json({ error: 'Nota não encontrada' });
            return;
        }

        res.json(grade);
    }

    async addGrade(req, res) {
        const { grade_value, class_id, activity_id } = req.body;

        const grade = new Grade(grade_value, class_id, activity_id);

        const result = await grade.addToDatabase();

        if (!result) {
            res.status(500).json({ error: 'Erro ao adicionar nota' });
            return;
        }

        res.status(201).json({ message: `Nota ${grade.id} adicionada com sucesso` });
    }

    async updateGrade(req, res) {
        const { grade_value, class_id, activity_id } = req.body;

        const grade = new Grade(grade_value, class_id, activity_id);
        grade.id = req.params.grade_id;

        const result = await grade.updateInDatabase();

        if (!result.changes) {
            res.status(404).json({ error: 'Nota não encontrada' });
            return;
        }

        res.status(200).json({ message: `Nota ${grade.id} atualizada com sucesso` });
    }

    async removeGrade(req, res) {
        const grade = new Grade();
        grade.id = req.params.grade_id;

        const result = await grade.removeFromDatabase();

        if (!result.changes) {
            res.status(404).json({ error: 'Nota não encontrada' });
            return;
        }

        res.status(200).json({ message: `Nota ${grade.id} removida com sucesso` });
    }

    async getLevelBySkill(req, res) {
        const skillId = req.params.skill_id;

        const average = await Grade.getLevelBySkill(skillId);

        res.json({ average });
    }
}

module.exports = new GradeController();
