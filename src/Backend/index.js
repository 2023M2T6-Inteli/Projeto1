const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const teachersRouter = require('./routes/teacher');
const classRouter = require('./routes/class');

app.use('/teachers', teachersRouter);
app.use('/class', classRouter);

const HOST = '127.0.0.1';
const PORT = 3000;
const DATABASE = 'data/database.sqlite';

app.get('/', (req, res) => {
    res.send(`Teste: ${req.query.teste}, teste2: ${req.query.teste2}`);
});


app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
