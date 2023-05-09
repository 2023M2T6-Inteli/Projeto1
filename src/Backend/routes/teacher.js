const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

router.use(express.json());

const DATABASE = 'data/database.db';

// adiciona um novo professor
router.post('/', (req, res) => {
    const db = new sqlite3.Database(DATABASE);
    const { name, email, password } = req.body;

    db.run(`INSERT INTO professor (nome, email, senha) VALUES (?, ?, ?)`, [name, email, password], (err) => {
        if (err) {
            res.status(500).send('Erro ao adicionar professor');
            console.log(err);
            return;
        }
        console.log(this.lastID);
        const teacherID = this.lastID;
        res.status(201).send(`Professor ${teacherID} adicionado com sucesso`);
    });
    db.close();

});

// atualiza informações de um professor
router.put('/', (req, res) => {
    const db = new sqlite3.Database(DATABASE);
    const { name, email, password } = req.body;

    db.run(`UPDATE professor SET nome = ?, email = ?, senha = ? `, [name, email, password], (err) => {
        if (err) {
            res.status(500).send('Erro ao atualizar professor');
            console.log(err);
            return;
        }
        res.status(201).send('Professor atualizado com sucesso');
    });

    db.close();
});

// remove um professor
router.delete('/', (req, res) => {
    const db = new sqlite3.Database(DATABASE);

    db.run(`DELETE FROM professor WHERE idprofessor = ? `, [req.query.teacher_id], (err) => {
        if (err) {
            res.status(500).send('Erro ao remover professor');
            console.log(err);
            return;
        }

        res.status(200).send('Professor removido com sucesso');
    });

    db.close();
});

// mostra informações de um professor
router.get('/', (req, res) => {
    const db = new sqlite3.Database(DATABASE);

    db.all("SELECT * FROM professor WHERE idprofessor = ?", [req.query.teacher_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar professores');
            return;
        }

        console.log(rows);
        res.send(rows);
    });

    db.close();
});

module.exports = router;