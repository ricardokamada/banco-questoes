import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Certifique-se de que o caminho está correto

const CheckoutButton = () => {
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        const initializePayment = async () => {
            try {
                const response = await api.post("/checkout"); // Chama o backend
                const prefId = response.data.checkoutUrl.split("pref_id=")[1]; // Extrai o ID da preferência
                setPreferenceId(prefId);

                if (window.MercadoPago) {
                    const mp = new window.MercadoPago("TEST-0b70bd0a-9655-4356-8086-c658d09f6ba4", { locale: 'pt-BR' });

                    mp.bricks().create("wallet", "wallet_container", {
                        initialization: {
                            preferenceId: prefId
                        },
                        customization: {
                            texts: { valueProp: "smart_option" }
                        }
                    });
                } else {
                    console.error("Erro: MercadoPago SDK não disponível.");
                }
            } catch (error) {
                console.error("Erro ao iniciar pagamento:", error);
            }
        };

        // Verifica se o SDK do MercadoPago foi carregado
        if (window.MercadoPago) {
            initializePayment();
        } else {
            console.error("MercadoPago SDK não carregado.");
        }
    }, []);

    return (
        <div>
            <div id="wallet_container"></div> {/* O botão do MercadoPago será inserido aqui */}
        </div>
    );
};

export default CheckoutButton;