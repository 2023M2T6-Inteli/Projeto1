const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const databaseMiddleware = require('./middlewares/database-connection');

const teachersController = require('./controllers/teacher-controller');

const gradesRouter = require('./routers/grade-router');
const pagesRouter = require('./routers/pages-router');
const activitiesRouter = require('./routers/activity-router');
const classesRouter = require('./routers/class-router');
const teachersRouter = require('./routers/teacher-router');

const HOST = '127.0.0.1';
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(databaseMiddleware);

app.post('/login', teachersController.loginTeacher);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/pages/home/index.html'));
});

app.use('/', pagesRouter);
app.use('/grades', gradesRouter);
app.use('/activities', activitiesRouter);
app.use('/classes', classesRouter);
app.use('/teachers', teachersRouter);


app.use(express.static("../Frontend/"));

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
