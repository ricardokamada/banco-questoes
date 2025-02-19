import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Certifique-se de que o caminho está correto

const CheckoutButton = () => {
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        // Verifica se o SDK do MercadoPago foi carregado
        if (!window.MercadoPago) {
            console.error("MercadoPago SDK não carregado.");
        }
    }, []);

    const handlePayment = async () => {
        try {
            const response = await api.post("/checkout"); // Chama o backend
            const prefId = response.data.checkoutUrl.split("pref_id=")[1]; // Extrai o ID da preferência
            setPreferenceId(prefId);

            if (window.MercadoPago) {
                const mp = new window.MercadoPago("APP_USR-c618fc99-6623-4c1c-ab58-9f6d333d390a", { locale: 'pt-BR' });

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

    return (
        <div>
            <button className="btn btn-primary mt-3" onClick={handlePayment}>
                Pagar com MercadoPago
            </button>
            <div id="wallet_container"></div> {/* O botão do MercadoPago será inserido aqui */}
        </div>
    );
};

export default CheckoutButton;
