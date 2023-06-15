const express = require('express');
const router = express.Router();

const activitiesController = require('../controllers/activity-controller');

router.get('/', activitiesController.getAllActivities);
router.get('/:activity_id', activitiesController.getActivity);
router.post('/', activitiesController.addActivity);
router.put('/:activity_id', activitiesController.updateActivity);
router.delete('/:activity_id', activitiesController.removeActivity);

module.exports = router;