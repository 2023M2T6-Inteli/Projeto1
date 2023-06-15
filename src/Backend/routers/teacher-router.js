const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teacher-controller');

router.get('/', teachersController.getAllTeachers);
router.get('/:teacher_id', teachersController.getTeacher);
router.post('/', teachersController.addTeacher);
router.put('/:teacher_id', teachersController.updateTeacher);
router.delete('/:teacher_id', teachersController.removeTeacher);

router.get('/:teacher_id/classes', teachersController.getClasses);
router.get('/:teacher_id/activities', teachersController.getActivities);

module.exports = router;