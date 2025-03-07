require("dotenv").config();
const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configurar MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

const createPreference = async (req, res) => {
    try {
        console.log("Requisição recebida no backend:", req.body);

        const { userId } = req.body; // Supondo que você está recebendo o userId no corpo da requisição
        console.log("UserId recebido:", userId);

        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: [
                    {
                        title: "Banco de Questões",
                        quantity: 1,
                        unit_price: 89.90,
                        currency_id: "BRL"
                    }
                ],
                back_urls: {
                    success: "http://localhost:5000/dashboard",
                    failure: "http://localhost:5000/erro",
                    pending: "http://localhost:5000/pendente"
                },
                auto_return: "approved",
                external_reference: userId, // Adicione o userId aqui
                mode: 'sandbox' // ✅ Modo sandbox habilitado corretamente
            }
        });

        console.log("Resposta da criação de preferência:", response); // Adicione log para a resposta da criação de preferência

        res.json({ checkoutUrl: response.init_point });
    } catch (error) {
        console.error('Erro ao criar preferência de pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
    }
};

module.exports = { createPreference };