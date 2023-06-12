const express = require('express');
const app = express();
const cors = require('cors');

const databaseMiddleware = require('./middlewares/database-connection');

const teachersController = require('./controllers/teacher-controller');
const classesController = require('./controllers/class-controller');
const activitiesController = require('./controllers/activity-controller');
const gradesController = require('./controllers/grade-controller');

const HOST = '127.0.0.1';
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(databaseMiddleware);

app.get('/teachers', teachersController.getAllTeachers);
app.get('/teachers/:teacher_id', teachersController.getTeacher);
app.post('/teachers', teachersController.addTeacher);
app.put('/teachers/:teacher_id', teachersController.updateTeacher);
app.delete('/teachers/:teacher_id', teachersController.removeTeacher);

app.get('/teachers/:teacher_id/classes', teachersController.getClasses);
app.get('/teachers/:teacher_id/activities', teachersController.getActivities);

app.post('/login', teachersController.loginTeacher);

app.get('/classes', classesController.getAllClasses);
app.get('/classes/:class_id', classesController.getClass);
app.post('/classes', classesController.addClass);
app.put('/classes/:class_id', classesController.updateClass);
app.delete('/classes/:class_id', classesController.removeClass);

// activities
app.get('/activities', activitiesController.getAllActivities);
app.get('/activities/:activity_id', activitiesController.getActivity);
app.post('/activities', activitiesController.addActivity);
app.put('/activities/:activity_id', activitiesController.updateActivity);
app.delete('/activities/:activity_id', activitiesController.removeActivity);

// grades
app.get('/grades', gradesController.getAllGrades);
app.get('/grades/:grade_id', gradesController.getGrade);
app.post('/grades', gradesController.addGrade);
app.put('/grades/:grade_id', gradesController.updateGrade);
app.delete('/grades/:grade_id', gradesController.removeGrade);

app.get('/grades/skill/:skill_id', gradesController.getLevelBySkill);

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
