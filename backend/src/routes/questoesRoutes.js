const express = require('express');
const questoesController = require('../controllers/questoesController');

const router = express.Router();

// Rotas em ordem correta
router.post('/', questoesController.createQuestao);
router.get('/search', questoesController.buscaEnunciado); // Rota para buscar questões por enunciado
router.get('/:id', questoesController.buscaID); // Rota para buscar questão por ID
router.get('/', questoesController.listQuestoes); // Listar todas as questões
router.put('/:id', questoesController.updateQuestao);
router.delete('/:id', questoesController.deleteQuestao);
router.post('/verificar', questoesController.verificarResposta);

module.exports = router;

