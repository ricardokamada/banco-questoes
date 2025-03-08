const express = require('express');
const { createPreference, paymentNotification } = require('../controllers/checkoutController');

const router = express.Router();

router.post('/create_preference', createPreference);
router.post('/webhook', paymentNotification);

module.exports = router;