const express = require('express');
const router = express.Router();

const gradesController = require('../controllers/grade-controller');

// Rota para buscar todas as notas
router.get('/', gradesController.getAllGrades);
// Rota para buscar uma nota específica com base no ID
router.get('/:grade_id', gradesController.getGrade);
// Rota para adicionar uma nova nota
router.post('/', gradesController.addGrade);
// Rota para atualizar uma nota existente com base no ID
router.put('/:grade_id', gradesController.updateGrade);
// Rota para remover uma nota com base no ID
router.delete('/:grade_id', gradesController.removeGrade);
// Rota para buscar o nível de habilidade com base no ID da habilidade
router.get('/skill/:skill_id', gradesController.getLevelBySkill);

module.exports = router;