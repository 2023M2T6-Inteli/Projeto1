const express = require('express');
const app = express();

app.use(express.json());

const teachersRouter = require('./routes/teacher');

app.use('/teachers', teachersRouter);

const HOST = '127.0.0.1';
const PORT = 3000;
const DATABASE = 'data/database.db';

app.get('/', (req, res) => {
    res.send(`Teste: ${req.query.teste}, teste2: ${req.query.teste2}`);
});


app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
