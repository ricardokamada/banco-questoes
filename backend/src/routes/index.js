const express = require('express');
const bancasRoutes = require('./bancasRoutes');
const disciplinasRoutes = require('./disciplinasRoutes');
const cargosRoutes = require('./cargosRoutes');

const router = express.Router();

router.use('/bancas', bancasRoutes);
router.use('/disciplinas', disciplinasRoutes);
router.use('/cargos', cargosRoutes);

module.exports = router;
