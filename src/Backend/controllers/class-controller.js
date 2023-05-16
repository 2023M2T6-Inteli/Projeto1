const Class = require('../models/class-model');

class classController {

    async getAllClasses(req, res) {
        const classes = await Class.getAllClasses();
        res.send(classes);
    }

    async getClass(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;
        console.log(_class.id);
        await _class.fetchFromDatabase();

        if (!_class.name) {
            res.status(404).send('Turma não encontrada');
            return;
        }

        res.send(_class);
    }

    async addClass(req, res) {
        const { class_name, school_year, school_id, teacher_id } = req.body;

        const _class = new Class(class_name, school_year, school_id, teacher_id);

        const result = await _class.addToDatabase();

        if (!result) {
            res.status(500).send('Erro ao adicionar professor');
            return;
        }

        res.status(201).send(`Turma ${_class.id} adicionado com sucesso`);
    }

    async updateClass(req, res) {
        const { class_name, school_year, school_id, teacher_id } = req.body;

        const _class = new Class(class_name, school_year, school_id, teacher_id);
        _class.id = req.params.class_id;

        const result = await _class.updateInDatabase();

        if (!result.changes) {
            res.status(404).send('Turma não encontrada');
            return;
        }

        res.status(200).send(`Turma ${_class.id} atualizado com sucesso`);
    }

    async removeClass(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;

        const result = await _class.removeFromDatabase();

        if (!result.changes) {
            res.status(404).send('Turma não encontrada');
            return;
        }

        res.status(200).send(`Turma ${_class.id} removido com sucesso`);
    }
}

module.exports = new classController();
