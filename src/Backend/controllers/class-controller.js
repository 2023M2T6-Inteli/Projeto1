const Class = require('../models/class-model');

class classController {

    async getAllClasses(req, res) {
        const classes = await Class.getAllClasses();
        res.json(classes);
    }

    async getClass(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;
        await _class.fetchFromDatabase();

        if (!_class.name) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        res.json(_class);
    }

    async addClass(req, res) {
        const { class_name, school_year, school_id, teacher_id } = req.body;

        const _class = new Class(class_name, school_year, school_id, teacher_id);

        const result = await _class.addToDatabase();

        if (!result) {
            res.status(500).json({ error: 'Erro ao adicionar turma' });
            return;
        }

        res.status(201).json({ message: `Turma ${_class.id} adicionada com sucesso` });
    }

    async updateClass(req, res) {
        const { class_name, school_year, school_id, teacher_id } = req.body;

        const _class = new Class(class_name, school_year, school_id, teacher_id);
        _class.id = req.params.class_id;

        const result = await _class.updateInDatabase();

        if (!result.changes) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        res.status(200).json({ message: `Turma ${_class.id} atualizada com sucesso` });
    }

    async removeClass(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;

        const result = await _class.removeFromDatabase();

        if (!result.changes) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        res.status(200).json({ message: `Turma ${_class.id} removida com sucesso` });
    }

    async getGrades(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;
        await _class.fetchFromDatabase();

        if (!_class.name) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        const grades = await _class.getGrades();
        res.json(grades);
    }
}

module.exports = new classController();
