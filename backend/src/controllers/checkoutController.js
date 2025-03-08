require("dotenv").config();
const { MercadoPagoConfig, Payment } = require('mercadopago');

// Configurar MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

const payment = new Payment(client);

const createPreference = async (req, res) => {
    try {
        // Step 4: Create the request object
        const body = {
            transaction_amount: 5.00,
            description: 'Banco de questoes',
            payment_method_id: 'pix',
            payer: {
                email: 'sdsfsdf@gmail.com'
            },
        };

        payment.create({ body }).then(console.log).catch(console.log);
    } catch (error) {
        console.error('Erro ao criar preferência de pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
    }
};

const paymentNotification = async (req, res) => {
    try {
        console.log("Notificação de pagamento recebida:", req.body);

        // Processar a notificação de pagamento aqui
        const { id, topic } = req.body;

        if (topic === 'payment') {
            // Lógica para lidar com a notificação de pagamento
            console.log(`Pagamento recebido com ID: ${id}`);
            // Atualizar o status do pagamento no banco de dados, etc.
        }

        res.status(200).send('Notificação recebida com sucesso');
    } catch (error) {
        console.error('Erro ao processar notificação de pagamento:', error);
        res.status(500).json({ error: 'Erro ao processar notificação de pagamento' });
    }
};

module.exports = { createPreference, paymentNotification };