const express = require('express');
const questoesController = require('../controllers/questoesController');

const router = express.Router();

router.post('/', questoesController.createQuestao);
router.get('/', questoesController.listQuestoes);
router.put('/:id', questoesController.updateQuestao);
router.delete('/:id', questoesController.deleteQuestao);
router.post('/verificar', questoesController.verificarResposta);


module.exports = router;
