const express = require('express');
const { getUserProfile, getUserPaymentStatus, handleWebhook } = require('../controllers/UserController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Middleware de autenticação

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.get('/payment-status', authMiddleware, getUserPaymentStatus); // Adicione esta linha
router.post('/webhook', handleWebhook); // Adicione esta linha para o webhook



module.exports = router;