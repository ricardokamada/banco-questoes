const express = require('express');
const bancasRoutes = require('./bancasRoutes');
const disciplinasRoutes = require('./disciplinasRoutes');
const cargosRoutes = require('./cargosRoutes');
const questoesRoutes = require('./questoesRoutes');
const authRoutes = require('./authRoutes'); 
const checkoutRoutes = require('./checkoutRoutes');


const router = express.Router();

router.use('/bancas', bancasRoutes);
router.use('/disciplinas', disciplinasRoutes);
router.use('/cargos', cargosRoutes);
router.use('/questoes', questoesRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/', authRoutes);

module.exports = router;
