const Class = require('../models/class-model');

class classController {

    // Método assíncrono para obter todas as turmas
    async getAllClasses(req, res) {
        const classes = await Class.getAllClasses();
        res.json(classes);
    }

    // Método assíncrono para obter uma turma específica
    async getClass(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;
        await _class.fetchFromDatabase();

        // Verifica se a turma foi encontrada no banco de dados
        if (!_class.name) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        // Retorna os detalhes da turma encontrada
        res.json(_class);
    }

    // Método assíncrono para adicionar uma nova turma
    async addClass(req, res) {
        const { class_name, school_year, school_id, teacher_id } = req.body;

        // Cria uma nova instância de turma com os dados fornecidos
        const _class = new Class(class_name, school_year, school_id, teacher_id);

        // Adiciona a turma ao banco de dados
        const result = await _class.addToDatabase();

        // Verifica se houve algum erro ao adicionar a turma
        if (!result) {
            res.status(500).json({ error: 'Erro ao adicionar turma' });
            return;
        }

        // Retorna uma mensagem de sucesso com o ID da turma adicionada
        res.status(201).json({ message: `Turma ${_class.id} adicionada com sucesso` });
    }

    // Método assíncrono para atualizar uma turma existente
    async updateClass(req, res) {
        const { class_name, school_year, school_id, teacher_id } = req.body;

        // Cria uma nova instância de turma com os dados atualizados
        const _class = new Class(class_name, school_year, school_id, teacher_id);
        _class.id = req.params.class_id;

        // Atualiza a turma no banco de dados
        const result = await _class.updateInDatabase();

        // Verifica se a turma foi encontrada e atualizada com sucesso
        if (!result.changes) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        // Retorna uma mensagem de sucesso com o ID da turma atualizada
        res.status(200).json({ message: `Turma ${_class.id} atualizada com sucesso` });
    }

    // Método assíncrono para remover uma turma
    async removeClass(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;

        // Remove a turma do banco de dados
        const result = await _class.removeFromDatabase();

        // Verifica se a turma foi encontrada e removida com sucesso
        if (!result.changes) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        // Retorna uma mensagem de sucesso com o ID da turma removida
        res.status(200).json({ message: `Turma ${_class.id} removida com sucesso` });
    }

    // Método assíncrono para obter as notas de uma turma
    async getGrades(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;
        await _class.fetchFromDatabase();

        // Verifica se a turma foi encontrada no banco de dados
        if (!_class.name) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        // Obtém as notas da turma
        const grades = await _class.getGrades();
        // Retorna as notas da turma
        res.json(grades);
    }

    // Método assíncrono para obter as atividades de uma turma
    async getActivities(req, res) {
        const _class = new Class();
        _class.id = req.params.class_id;
        await _class.fetchFromDatabase();

        // Verifica se a turma foi encontrada no banco de dados
        if (!_class.name) {
            res.status(404).json({ error: 'Turma não encontrada' });
            return;
        }

        // Obtém as atividades da turma
        const activities = await _class.getActivities();
        // Retorna as atividades da turma
        res.json(activities);
    }
}

module.exports = new classController();
