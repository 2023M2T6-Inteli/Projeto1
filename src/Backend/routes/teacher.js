const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

router.use(express.json());

const DATABASE = 'data/database.sqlite';

// mostra todos os professores
router.get('/', (req, res) => {
    const db = new sqlite3.Database(DATABASE);

    db.all("SELECT * FROM teacher", (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar professores');
            return;
        }

        res.send(rows);
    });

    db.close();
});

// mostra informações de um professor
router.get('/:teacher_id', (req, res) => {
    const db = new sqlite3.Database(DATABASE);

    db.all("SELECT * FROM teacher WHERE teacher_id = ?", [req.params.teacher_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar professores');
            return;
        }

        if (rows.length == 0) {
            res.status(404).send('Professor não encontrado');
            return;
        }

        res.send(rows);
    });

    db.close();
});

// adiciona um novo professor
router.post('/', (req, res) => {
    const db = new sqlite3.Database(DATABASE);
    const { teacher_name, email, teacher_password } = req.body;

    db.run(`INSERT INTO teacher (teacher_name, email, teacher_password) VALUES (?, ?, ?)`, [teacher_name, email, teacher_password], function (err) {
        if (err) {
            res.status(500).send('Erro ao adicionar professor');
            console.log(err);
            return;
        }
        res.status(201).send(`Professor ${this.lastID} adicionado com sucesso`);
    });

    db.close();
});

// atualiza informações de um professor
router.put('/:teacher_id', (req, res) => {
    const db = new sqlite3.Database(DATABASE);
    const { teacher_name, email, teacher_password } = req.body;

    db.run(`UPDATE teacher SET teacher_name = coalesce(?, teacher_name), email = coalesce(?, email), teacher_password = coalesce(?, teacher_password) WHERE teacher_id = ?`, [teacher_name, email, teacher_password, req.params.teacher_id], (err) => {
        if (err) {
            res.status(500).send('Erro ao atualizar professor');
            console.log(err);
            return;
        }

        if (this.changes == 0) {
            res.status(404).send('Professor não encontrado');
            return;
        }

        res.status(201).send('Professor atualizado com sucesso');
    });

    db.close();
});

// remove um professor
router.delete('/:teacher_id', (req, res) => {
    const db = new sqlite3.Database(DATABASE);

    db.run(`DELETE FROM teacher WHERE teacher_id = ? `, [req.params.teacher_id], (err) => {
        if (err) {
            res.status(500).send('Erro ao remover professor');
            console.log(err);
            return;
        }

        res.status(200).send('Professor removido com sucesso');
    });

    db.close();
});

module.exports = router;