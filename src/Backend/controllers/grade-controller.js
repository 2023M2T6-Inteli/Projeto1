const Grade = require('../models/grade-model');

class GradeController {
    // Função assíncrona que obtém todas as notas
    async getAllGrades(req, res) {
        const grades = await Grade.getAllGrades(); // Obtém todas as notas do modelo Grade
        res.json(grades); // Retorna as notas em formato JSON
    }

    // Função assíncrona que obtém uma nota específica
    async getGrade(req, res) {
        const grade = new Grade(); // Cria uma nova instância de Grade
        grade.id = req.params.grade_id; // Obtém o ID da nota a partir dos parâmetros da requisição
        await grade.fetchFromDatabase(); // Busca a nota no banco de dados

        // Se o valor da nota não existe, significa que a nota não foi encontrada
        if (!grade.value) {
            res.status(404).json({ error: 'Nota não encontrada' });
            return;
        }

        // Retorna a nota encontrada em formato JSON
        res.json(grade);
    }

    // Função assíncrona que adiciona uma nota
    async addGrade(req, res) {
        const { grade_value, class_id, activity_id } = req.body; // Obtém os valores da nota, ID da turma e ID da atividade a partir do corpo da requisição

        // Cria uma nova instância de Grade com os valores obtidos
        const grade = new Grade(grade_value, class_id, activity_id);

        // Adiciona a nota ao banco de dados
        const result = await grade.addToDatabase();

        // Se o resultado não existe, ocorreu um erro ao adicionar a nota
        if (!result) {
            res.status(500).json({ error: 'Erro ao adicionar nota' });
            return;
        }

        // Retorna um status 201 (Criado) e uma mensagem indicando que a nota foi adicionada com sucesso
        res.status(201).json({ message: `Nota ${grade.id} adicionada com sucesso` });
    }

    // Função assíncrona que atualiza uma nota
    async updateGrade(req, res) {
        // Obtém os novos valores da nota, ID da turma e ID da atividade a partir do corpo da requisição
        const { grade_value, class_id, activity_id } = req.body;

        // Cria uma nova instância de Grade com os novos valores
        const grade = new Grade(grade_value, class_id, activity_id);
        // Obtém o ID da nota a ser atualizada a partir dos parâmetros da requisição
        grade.id = req.params.grade_id;

        const result = await grade.updateInDatabase(); // Atualiza a nota no banco de dados

        // Se não houve alterações na nota, significa que a nota não foi encontrada
        if (!result.changes) {
            res.status(404).json({ error: 'Nota não encontrada' }); 
            return;
        }

        // Retorna um status 200 (OK) e uma mensagem indicando que a nota foi atualizada com sucesso
        res.status(200).json({ message: `Nota ${grade.id} atualizada com sucesso` });
    }

    // Função assíncrona que remove uma nota
    async removeGrade(req, res) {
        const grade = new Grade();
        grade.id = req.params.grade_id;

        const result = await grade.removeFromDatabase();

        // Se não houve alterações na nota, significa que a nota não foi encontrada
        if (!result.changes) {
            res.status(404).json({ error: 'Nota não encontrada' });
            return;
        }

        res.status(200).json({ message: `Nota ${grade.id} removida com sucesso` });
    }

    // Função assíncrona que obtém a média das notas por habilidade
    async getLevelBySkill(req, res) {
        const skillId = req.params.skill_id;

        // Obtém a média das notas para a habilidade específica
        const average = await Grade.getLevelBySkill(skillId);

        // Retorna a média das notas em formato JSON
        res.json({ average });
    }
}

// Exporta uma nova instância de GradeController
module.exports = new GradeController();
