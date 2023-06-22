const Activity = require('../models/activity-model');

class ActivityController {

    // Obtém todas as atividades
    async getAllActivities(req, res) {
        const activities = await Activity.getAllActivities();
        res.json(activities);
    }

    // Obtém uma atividade específica pelo ID
    async getActivity(req, res) {
        const activity = new Activity();
        activity.id = req.params.activity_id;
        await activity.fetchFromDatabase();

        // Verifica se a atividade foi encontrada
        if (!activity.name) {
            res.status(404).json({ error: 'Atividade não encontrada' });
            return;
        }

        res.json(activity);
    }

    // Adiciona uma nova atividade
    async addActivity(req, res) {
        const { activity_name, activity_description, skill_id, teacher_id } = req.body;

        // Cria uma nova instância da atividade com os dados fornecidos
        const activity = new Activity(activity_name, activity_description, skill_id, teacher_id);

        // Adiciona a atividade ao banco de dados
        const result = await activity.addToDatabase();

        // Verifica se houve um erro ao adicionar a atividade
        if (!result) {
            res.status(500).json({ error: 'Erro ao adicionar atividade' });
            return;
        }

        res.status(201).json({ message: `Atividade ${activity.id} adicionada com sucesso` });
    }

    // Atualiza uma atividade existente
    async updateActivity(req, res) {
        const { activity_name, activity_description, skill_id, teacher_id } = req.body;

        // Cria uma nova instância da atividade com os dados fornecidos
        const activity = new Activity(activity_name, activity_description, skill_id, teacher_id);
        activity.id = req.params.activity_id;

        // Atualiza a atividade no banco de dados
        const result = await activity.updateInDatabase();

        // Verifica se a atividade foi encontrada e atualizada
        if (!result.changes) {
            res.status(404).json({ error: 'Atividade não encontrada' });
            return;
        }

        res.status(200).json({ message: `Atividade ${activity.id} atualizada com sucesso` });
    }

    // Remove uma atividade existente
    async removeActivity(req, res) {
        const activity = new Activity();
        activity.id = req.params.activity_id;

        // Remove a atividade do banco de dados
        const result = await activity.removeFromDatabase();

        // Verifica se a atividade foi encontrada e removida
        if (!result.changes) {
            res.status(404).json({ error: 'Atividade não encontrada' });
            return;
        }

        res.status(200).json({ message: `Atividade ${activity.id} removida com sucesso` });
    }

    // Obtém a nota de uma atividade específica de uma turma específica
    async getGradeByActivityAndClass(req, res) {
        const activity = new Activity();
        activity.id = req.params.activity_id;
        await activity.fetchFromDatabase();

        // Verifica se a atividade foi encontrada
        if (!activity.name) {
            res.status(404).json({ error: 'Atividade não encontrada' });
            return;
        }

        const grade = await activity.getGradeByClassID(req.params.class_id);

        // Verifica se a nota foi encontrada
        if (!grade[0]) {
            res.status(404).json({ error: 'Nota não encontrada' });
            return;
        }

        res.json(grade[0]);
    }
}

module.exports = new ActivityController();
