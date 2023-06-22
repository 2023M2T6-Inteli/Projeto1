const express = require('express'); // Importa o módulo express
const router = express.Router(); // Cria um objeto do Express para definir as rotas

const activitiesController = require('../controllers/activity-controller'); // Importa o módulo para lidar com a lógica das atividades

// Rota para buscar todas as atividades
router.get('/', activitiesController.getAllActivities);
// Rota para buscar uma atividade específica com base no ID
router.get('/:activity_id', activitiesController.getActivity);
// Rota para adicionar uma nova atividade
router.post('/', activitiesController.addActivity);
// Rota para atualizar uma atividade existente com base no ID
router.put('/:activity_id', activitiesController.updateActivity);
// Rota para remover uma atividade com base no ID
router.delete('/:activity_id', activitiesController.removeActivity);
// Rota para buscar a nota de uma atividade específica de uma turma específica com base no ID da atividade e no ID da turma
router.get('/:activity_id/class/:class_id', activitiesController.getGradeByActivityAndClass);
module.exports = router;