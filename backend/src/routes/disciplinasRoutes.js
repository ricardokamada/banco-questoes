const express = require('express');
const disciplinasController = require('../controllers/disciplinasController');

const router = express.Router();


// Rotas para disciplinas
router.post('/', disciplinasController.createDisciplina); // Criar uma nova disciplina
router.get('/', disciplinasController.listDisciplinas); // Listar todas as disciplinas
router.get('/buscar', disciplinasController.getDisciplinasByName); // Buscar disciplinas pelo nome
router.get('/:id', disciplinasController.getDisciplinaById); // Buscar disciplina por ID
router.put('/:id', disciplinasController.updateDisciplina); // Atualizar uma disciplina
router.delete('/:id', disciplinasController.deleteDisciplina); // Deletar uma disciplina

module.exports = router;
