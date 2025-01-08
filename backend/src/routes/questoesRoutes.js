const express = require('express');
const questoesController = require('../controllers/questoesController');

const router = express.Router();

router.post('/', questoesController.createQuestao);
router.get('/', questoesController.listQuestoes);
router.get('/:id', questoesController.buscaID); // Rota para buscar questão por ID
router.get('/search', questoesController.buscaEnunciado); // Rota para buscar questões por enunciado
router.put('/:id', questoesController.updateQuestao);
router.delete('/:id', questoesController.deleteQuestao);
router.post('/verificar', questoesController.verificarResposta);

module.exports = router;

