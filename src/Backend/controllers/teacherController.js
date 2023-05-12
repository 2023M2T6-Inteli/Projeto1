const Teacher = require('../models/teacherModel');

class teacherController {

    async getAllTeachers(req, res) {
        const teachers = await Teacher.getAllTeachers();
        res.send(teachers);
    }

    async getTeacher(req, res) {
        const teacher = new Teacher();
        teacher.id = req.params.teacher_id;
        await teacher.fetchFromDatabase();

        if (!teacher.name) {
            res.status(404).send('Professor não encontrado');
            return;
        }

        res.send(teacher);
    }

    async addTeacher(req, res) {
        const { teacher_name, email, teacher_password } = req.body;

        const teacher = new Teacher(teacher_name, email, teacher_password);

        if (await teacher.exists()) {
            res.status(409).send('Professor já existe');
            return;
        }

        const result = await teacher.addToDatabase();

        if (!result) {
            res.status(500).send('Erro ao adicionar professor');
            return;
        }

        res.status(201).send(`Professor ${teacher.id} adicionado com sucesso`);
    }

    async updateTeacher(req, res) {
        const { teacher_name, email, teacher_password } = req.body;

        const teacher = new Teacher(teacher_name, email, teacher_password);
        teacher.id = req.params.teacher_id;

        const result = await teacher.updateInDatabase();

        if (!result.changes) {
            res.status(404).send('Professor não encontrado');
            return;
        }

        res.status(200).send(`Professor ${teacher.id} atualizado com sucesso`);
    }

    async removeTeacher(req, res) {
        const teacher = new Teacher();
        teacher.id = req.params.teacher_id;

        const result = await teacher.removeFromDatabase();

        if (!result.changes) {
            res.status(404).send('Professor não encontrado');
            return;
        }

        res.status(200).send(`Professor ${teacher.id} removido com sucesso`);
    }

    async getClasses(req, res) {
        const teacher = new Teacher();
        teacher.id = req.params.teacher_id;
        await teacher.fetchFromDatabase();

        if (!teacher.name) {
            res.status(404).send('Professor não encontrado');
            return;
        }

        const classes = await teacher.getClasses();
        res.send(classes);
    }

    async getStudents(req, res) {
        const teacher = new Teacher();
        teacher.id = req.params.teacher_id;
        await teacher.fetchFromDatabase();

        if (!teacher.name) {
            res.status(404).send('Professor não encontrado');
            return;
        }

        const students = await teacher.getStudents();
        res.send(students);
    }
}

module.exports = new teacherController();
