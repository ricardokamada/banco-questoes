const express = require('express');
const cargosController = require('../controllers/cargosController');

const router = express.Router();

router.post('/', cargosController.createCargo);
router.get('/', cargosController.listCargos);
router.put('/:id', cargosController.updateCargo);
router.delete('/:id', cargosController.deleteCargo);

module.exports = router;
