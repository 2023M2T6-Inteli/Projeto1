const express = require('express');
const router = express.Router();

const gradesController = require('../controllers/grade-controller');

router.get('/', gradesController.getAllGrades);
router.get('/:grade_id', gradesController.getGrade);
router.post('/', gradesController.addGrade);
router.put('/:grade_id', gradesController.updateGrade);
router.delete('/:grade_id', gradesController.removeGrade);

router.get('/skill/:skill_id', gradesController.getLevelBySkill);

module.exports = router;