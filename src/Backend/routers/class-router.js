const express = require('express');
const router = express.Router();

const classesController = require('../controllers/class-controller');

// Rota para buscar todas as classes
router.get('/', classesController.getAllClasses);
// Rota para buscar uma classe específica com base no ID
router.get('/:class_id', classesController.getClass);
// Rota para adicionar uma nova classe
router.post('/', classesController.addClass);
// Rota para atualizar uma classe existente com base no ID
router.put('/:class_id', classesController.updateClass);
// Rota para remover uma classe com base no ID
router.delete('/:class_id', classesController.removeClass);
// Rota para buscar as notas de uma classe específica com base no ID da classe
router.get('/:class_id/grades', classesController.getGrades);
// Rota para buscar as atividades de uma classe específica com base no ID da classe
router.get('/:class_id/activities', classesController.getActivities);

module.exports = router;