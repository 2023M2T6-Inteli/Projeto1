// Importa os módulos necessários para criar o servidor web utilizando o Express
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
// Importa o middleware que será usado para estabelecer a conexão com o banco de dados.
const databaseMiddleware = require('./middlewares/database-connection');
// Importa o controlador responsável pelas ações relacionadas aos professores.
const teachersController = require('./controllers/teacher-controller');

// Importa os roteadores responsáveis por definir as rotas e manipular as requisições para cada recurso específico
const gradesRouter = require('./routers/grade-router');
const pagesRouter = require('./routers/pages-router');
const activitiesRouter = require('./routers/activity-router');
const classesRouter = require('./routers/class-router');
const teachersRouter = require('./routers/teacher-router');

// Define o endereço de host e a porta em que o servidor será executado.
const HOST = '127.0.0.1';
const PORT = 1234;

// Configura o Express para usar middlewares.
app.use(express.json());
app.use(cors());
app.use(databaseMiddleware);

// Rota definida para tratar as requisições POST enviadas para fazer login dos professores
app.post('/api/login', teachersController.loginTeacher);

// Define a rota raiz '/' para tratar as requisições GET e enviar o arquivo HTML da página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/pages/home/index.html'));
});

// Configura o Express para usar os roteadores para as rotas correspondentes.
app.use('/', pagesRouter);
app.use('/api/grades', gradesRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/classes', classesRouter);
app.use('/api/teachers', teachersRouter);

// Configura o Express para servir arquivos estáticos
app.use(express.static("../Frontend/"));

// Inicia o servidor e o faz escutar as conexões na porta e endereço especificados. 
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
