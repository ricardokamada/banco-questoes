const express = require('express');
const disciplinasController = require('../controllers/disciplinasController');

const router = express.Router();

router.post('/', disciplinasController.createDisciplina);
router.get('/', disciplinasController.listDisciplinas);
router.put('/:id', disciplinasController.updateDisciplina);
router.delete('/:id', disciplinasController.deleteDisciplina);

module.exports = router;
