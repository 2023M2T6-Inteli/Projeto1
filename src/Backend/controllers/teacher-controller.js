const Teacher = require('../models/teacher-model');

class teacherController {

    async getAllTeachers(req, res) {
        const teachers = await Teacher.getAllTeachers();
        res.json(teachers);
    }

    async getTeacher(req, res) {
        const teacher = new Teacher();
        teacher.id = req.params.teacher_id;
        await teacher.fetchFromDatabase();

        if (!teacher.name) {
            res.status(404).json({ error: 'Professor não encontrado' });
            return;
        }

        res.json(teacher);
    }

    async addTeacher(req, res) {
        const { teacher_name, email, teacher_password } = req.body;

        const teacher = new Teacher(teacher_name, email, teacher_password);

        if (await teacher.exists()) {
            res.status(409).json({ error: 'Professor já existe' });
            return;
        }

        const result = await teacher.addToDatabase();

        if (!result) {
            res.status(500).json({ error: 'Erro ao adicionar professor' });
            return;
        }

        res.status(201).json({ message: 'Professor adicionado com sucesso', teacherID: teacher.id });
    }

    async updateTeacher(req, res) {
        const { teacher_name, email, teacher_password } = req.body;

        const teacher = new Teacher(teacher_name, email, teacher_password);
        teacher.id = req.params.teacher_id;

        const result = await teacher.updateInDatabase();

        if (!result.changes) {
            res.status(404).json({ error: 'Professor não encontrado' });
            return;
        }

        res.status(200).json({ message: `Professor ${teacher.id} atualizado com sucesso` });
    }

    async removeTeacher(req, res) {
        const teacher = new Teacher();
        teacher.id = req.params.teacher_id;

        const result = await teacher.removeFromDatabase();

        if (!result.changes) {
            res.status(404).json({ error: 'Professor não encontrado' });
            return;
        }

        res.status(200).json({ message: `Professor ${teacher.id} removido com sucesso` });
    }

    async getClasses(req, res) {
        const teacher = new Teacher();
        teacher.id = req.params.teacher_id;
        await teacher.fetchFromDatabase();

        if (!teacher.name) {
            res.status(404).json({ error: 'Professor não encontrado' });
            return;
        }

        const classes = await teacher.getClasses();
        res.json(classes);
    }

    async getActivities(req, res) {
        const teacher = new Teacher();
        teacher.id = req.params.teacher_id;
        await teacher.fetchFromDatabase();

        if (!teacher.name) {
            res.status(404).json({ error: 'Professor não encontrado' });
            return;
        }

        const activities = await teacher.getActivities();
        res.json(activities);
    }

    async loginTeacher(req, res) {
        const { email, password } = req.body;

        const teacher = new Teacher();
        teacher.email = email;
        teacher.password = password;

        const result = await teacher.canLogin();

        if (!result) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        await teacher.fetchFromDatabaseByEmail();
        res.status(200).json({ message: `Professor ${teacher.id} logado com sucesso`, teacherID: teacher.id });
    }
}

module.exports = new teacherController();
