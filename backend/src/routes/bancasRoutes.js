const express = require('express');
const bancasController = require('../controllers/bancasController');

const router = express.Router();

router.post('/', bancasController.createBanca);
router.get('/', bancasController.listBancas);
router.put('/:id', bancasController.updateBanca);
router.delete('/:id', bancasController.deleteBanca);

module.exports = router;
