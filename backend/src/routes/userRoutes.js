const express = require('express');
const { getUserProfile, getUserPaymentStatus } = require('../controllers/UserController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Middleware de autenticação

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.get('/payment-status', authMiddleware, getUserPaymentStatus); // Adicione esta linha


module.exports = router;