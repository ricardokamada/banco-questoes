require("dotenv").config();
const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configurar MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

const createPreference = async (req, res) => {
    try {
        const preference = new Preference(client);
        const response = await preference.create({
            body: {
                items: [
                    {
                        title: "Acesso ao Banco de Questões",
                        quantity: 1,
                        unit_price: 29.90,
                        currency_id: "BRL"
                    }
                ],
                back_urls: {
                    success: "http://localhost:3000/sucesso",
                    failure: "http://localhost:3000/erro",
                    pending: "http://localhost:3000/pendente"
                },
                auto_return: "approved",
                sandbox_init_point: true, // Ativa o modo SANDBOX
            }
        });

        res.json({ checkoutUrl: response.body.init_point });
    } catch (error) {
        console.error("Erro ao criar preferência:", error);
        res.status(500).json({ error: "Erro ao criar pagamento" });
    }
};

module.exports = { createPreference };
