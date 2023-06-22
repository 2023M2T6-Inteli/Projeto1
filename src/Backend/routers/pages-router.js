const express = require('express');
const path = require('path');

const router = express.Router();

// Lista de páginas
const pages = [
    'home',
    'atividades_do_professor',
    'avaliacao_atividade',
    'cadastro',
    'habilidades_turma',
    'indicacao_de_conteudo',
    'login',
    'registro_de_atividades',
    'turmas'
];

// Para cada página, define uma rota correspondente
pages.forEach(page => {
    router.get(`/${page}`, (req, res) => {
        // Envia o arquivo HTML correspondente da página
        res.sendFile(path.join(__dirname, `../../Frontend/pages/${page}/index.html`));
    });
});

module.exports = router;
