require("dotenv").config();
const { MercadoPagoConfig, Payment } = require('mercadopago');

// Configurar MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

const payment = new Payment(client);

const createPreference = async (req, res) => {
    try {
        const body = {
            transaction_amount: 5.00,
            description: 'Banco de questoes',
            payment_method_id: 'pix',
            payer: {
                email: 'sdsfsdf@gmail.com' // Definir email fixo (pode ser substituído pelo frontend)
            }
        };

        console.log("Enviando requisição ao MercadoPago...");
        const response = await payment.create({ body });

        console.log("Resposta do MercadoPago:", response);

        if (response && response.point_of_interaction && response.point_of_interaction.transaction_data) {
            const ticket_url = response.point_of_interaction.transaction_data.ticket_url;
            console.log("URL de pagamento gerada:", ticket_url);

            return res.status(200).json({ ticket_url });
        } else {
            console.error("Erro: ticket_url não encontrada na resposta.");
            return res.status(500).json({ error: "Erro ao gerar URL de pagamento." });
        }

    } catch (error) {
        console.error('Erro ao criar preferência de pagamento:', error);
        return res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
    }
};

const paymentNotification = async (req, res) => {
    try {
        console.log("Notificação de pagamento recebida:", req.body);

        const { id, topic } = req.body;

        if (topic === 'payment') {
            console.log(`Pagamento recebido com ID: ${id}`);
            // Aqui você pode atualizar o banco de dados com o status do pagamento
        }

        res.status(200).send('Notificação recebida com sucesso');
    } catch (error) {
        console.error('Erro ao processar notificação de pagamento:', error);
        res.status(500).json({ error: 'Erro ao processar notificação de pagamento' });
    }
};

module.exports = { createPreference, paymentNotification };
