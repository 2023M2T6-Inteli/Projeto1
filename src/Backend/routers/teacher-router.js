const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teacher-controller');

// Rota para buscar todos os professores
router.get('/', teachersController.getAllTeachers);
// Rota para buscar um professor específico com base no ID
router.get('/:teacher_id', teachersController.getTeacher);
// Rota para adicionar um novo professor
router.post('/', teachersController.addTeacher);
// Rota para atualizar um professor existente com base no ID
router.put('/:teacher_id', teachersController.updateTeacher);
// Rota para remover um professor com base no ID
router.delete('/:teacher_id', teachersController.removeTeacher);
// Rota para buscar todas as turmas de um professor específico com base no ID do professor
router.get('/:teacher_id/classes', teachersController.getClasses);
// Rota para buscar todas as atividades de um professor específico com base no ID do professor
router.get('/:teacher_id/activities', teachersController.getActivities);

module.exports = router;