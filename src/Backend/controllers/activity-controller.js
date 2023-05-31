const Activity = require('../models/activity-model');

class ActivityController {

    async getAllActivities(req, res) {
        const activities = await Activity.getAllActivities();
        res.send(activities);
    }

    async getActivity(req, res) {
        const activity = new Activity();
        activity.id = req.params.activity_id;
        await activity.fetchFromDatabase();

        if (!activity.name) {
            res.status(404).send('Atividade não encontrada');
            return;
        }

        res.send(activity);
    }

    async addActivity(req, res) {
        const { activity_name, activity_description, skill_id, teacher_id } = req.body;

        const activity = new Activity(activity_name, activity_description, skill_id, teacher_id);

        const result = await activity.addToDatabase();

        if (!result) {
            res.status(500).send('Erro ao adicionar atividade');
            return;
        }

        res.status(201).send(`Atividade ${activity.id} adicionada com sucesso`);
    }

    async updateActivity(req, res) {
        const { activity_name, activity_description, skill_id, teacher_id } = req.body;

        const activity = new Activity(activity_name, activity_description, skill_id, teacher_id);
        activity.id = req.params.activity_id;

        const result = await activity.updateInDatabase();

        if (!result.changes) {
            res.status(404).send('Atividade não encontrada');
            return;
        }

        res.status(200).send(`Atividade ${activity.id} atualizada com sucesso`);
    }

    async removeActivity(req, res) {
        const activity = new Activity();
        activity.id = req.params.activity_id;

        const result = await activity.removeFromDatabase();

        if (!result.changes) {
            res.status(404).send('Atividade não encontrada');
            return;
        }

        res.status(200).send(`Atividade ${activity.id} removida com sucesso`);
    }
}

module.exports = new ActivityController();
