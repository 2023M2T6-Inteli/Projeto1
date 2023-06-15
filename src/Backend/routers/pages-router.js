const express = require('express');
const path = require('path');

const router = express.Router();

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

pages.forEach(page => {
    router.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, `../../Frontend/pages/${page}/index.html`));
    });
});

module.exports = router;
