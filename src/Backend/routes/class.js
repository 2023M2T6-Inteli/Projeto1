const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

router.use(express.json());

const DATABASE = 'data/database.sqlite';

// mostra todas as turmas
router.get('/', (req, res) => {
    const db = new sqlite3.Database(DATABASE);

    db.all("SELECT * FROM class", (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar turmas');
            return;
        }

        res.send(rows);
    });

    db.close();
});

// mostra informações de uma turma
router.get('/:class_id', (req, res) => {
    const db = new sqlite3.Database(DATABASE);

    db.all("SELECT * FROM class WHERE class_id = ?", [req.params.class_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar turma');
            return;
        }

        if (rows.length == 0) {
            res.status(404).send('Turma não encontrada');
            return;
        }

        res.send(rows);
    });

    db.close();
});

// adiciona uma nova turma
router.post('/', (req, res) => {
    const db = new sqlite3.Database(DATABASE);
    const { class_name, school_year, school, teacher_id } = req.body;

    db.run(`INSERT INTO class (class_name, school_year, school, teacher_id) VALUES (?, ?, ?, ?)`, [class_name, school_year, school, teacher_id], function (err) {
        if (err) {
            res.status(500).send('Erro ao adicionar turma');
            console.log(err);
            return;
        }

        res.status(201).send(`Turma ${this.lastID} adicionada com sucesso`);
    });

    db.close();
});

// atualiza uma turma
router.put('/:class_id', (req, res) => {
    const db = new sqlite3.Database(DATABASE);
    const { class_name, school_year, school, teacher_id } = req.body;

    db.run(`UPDATE class SET class_name = coalesce(?, class_name), school_year = coalesce(?, school_year), school = coalesce(?, school), teacher_id = coalesce(?, teacher_id) WHERE class_id = ?`, [class_name, school_year, school, teacher_id, req.params.class_id], function (err) {
        if (err) {
            res.status(500).send('Erro ao atualizar turma');
            console.log(err); 
            return;
        }

        if (this.changes == 0) {
            res.status(404).send('Turma não encontrada');
            return;
        }

        res.status(200).send(`Turma ${req.params.class_id} atualizada com sucesso`);
    });

    db.close();
});

module.exports = router;
