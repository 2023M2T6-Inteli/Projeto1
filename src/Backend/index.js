const express = require('express');
const app = express();
const cors = require('cors');

const teachersController = require('./controllers/teacherController');
const classesController = require('./controllers/classController');

const HOST = '127.0.0.1';
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/teachers', teachersController.getAllTeachers);
app.get('/teachers/:teacher_id', teachersController.getTeacher);
app.post('/teachers', teachersController.addTeacher);
app.put('/teachers/:teacher_id', teachersController.updateTeacher);
app.delete('/teachers/:teacher_id', teachersController.removeTeacher);

app.get('/teachers/:teacher_id/classes', teachersController.getClasses);
app.get('/teachers/:teacher_id/students', teachersController.getStudents);


app.get('/classes', classesController.getAllClasses);
app.get('/classes/:class_id', classesController.getClass);
app.post('/classes', classesController.addClass);
app.put('/classes/:class_id', classesController.updateClass);
app.delete('/classes/:class_id', classesController.removeClass);

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
