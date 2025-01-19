const express = require('express');
const cargosController = require('../controllers/cargosController');

const router = express.Router();

router.post('/', cargosController.createCargo); // Criar um cargo
router.get('/', cargosController.listCargos); // Listar todos os cargos
router.get('/buscar', cargosController.getCargosByName); // Buscar cargos pelo nome (rota diferenciada)
router.get('/:id', cargosController.getCargoById); // Buscar cargo por ID
router.put('/:id', cargosController.updateCargo); // Atualizar um cargo
router.delete('/:id', cargosController.deleteCargo); // Deletar um cargo


module.exports = router;
