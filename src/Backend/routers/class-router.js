const express = require('express');
const router = express.Router();

const classesController = require('../controllers/class-controller');

router.get('/', classesController.getAllClasses);
router.get('/:class_id', classesController.getClass);
router.post('/', classesController.addClass);
router.put('/:class_id', classesController.updateClass);
router.delete('/:class_id', classesController.removeClass);

module.exports = router;