const User = require('../models/userModel');

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Supondo que o ID do usuário está disponível no objeto req.user
        const user = await User.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar perfil do usuário' });
    }
};

const getUserPaymentStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ status: user.status_pagamento });
    } catch (error) {
        console.error('Erro ao buscar status do pagamento:', error);
        res.status(500).json({ error: 'Erro ao buscar status do pagamento' });
    }
};

module.exports = { getUserProfile, getUserPaymentStatus };