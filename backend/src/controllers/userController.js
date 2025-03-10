const User = require('../models/userModel');
const axios = require('axios');

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

const handleWebhook = async (req, res) => {
    try {
        console.log('Recebendo webhook:', req.body);

        const { type, data } = req.body;

        if (type === 'payment') {
            const paymentId = data.id;
            console.log('Processando pagamento:', paymentId);

            try {
                // Aqui você deve buscar os detalhes do pagamento usando a API do MercadoPago
                const paymentDetails = await getPaymentDetails(paymentId);
                console.log('Detalhes do pagamento:', paymentDetails);

                const userId = paymentDetails.external_reference;
                if (!userId) {
                    console.error("Erro: external_reference não encontrado no pagamento.");
                    return res.status(400).json({ error: "external_reference não encontrado" });
                }
                
                

                if (paymentDetails.status === 'approved') {
                    const userId = paymentDetails.external_reference; // Use o campo external_reference
                    console.log('Atualizando status do pagamento para o usuário:', userId);
                    await User.updatePaymentStatus(userId, 'Aprovado', true);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes do pagamento:', error);
            }
        }

        // Responder com status 200 para indicar que a notificação foi recebida com sucesso
        res.status(200).send('OK');
    } catch (error) {
        console.error('Erro ao processar webhook:', error);
        res.status(500).send('Erro ao processar webhook');
    }
};

const getPaymentDetails = async (paymentId) => {
    try {
        console.log('Buscando detalhes do pagamento para ID:', paymentId);
        const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
            }
        });
        console.log('Resposta da API do MercadoPago:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do pagamento:', error);
        throw error;
    }
};

module.exports = { getUserProfile, getUserPaymentStatus, handleWebhook };