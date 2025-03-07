import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckoutButton from '../../components/common/CheckoutButton'; // Certifique-se do caminho correto
import { AuthContext } from '../../context/AuthContext'; // Importe o contexto de autenticação
import { Navigate } from 'react-router-dom'; // Importe o Navigate para redirecionamento

const CheckoutPage = () => {
    const { user, loading } = useContext(AuthContext); // Obtenha o usuário logado do contexto de autenticação

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleCheckout = async () => {
        try {
            console.log("User no Checkout------------:", user); // Verifique se o user está definido
            console.log("User ID enviado------------:", user.id); // Verifique se o user.id está definido

            const response = await fetch('http://localhost:3000/api/create-preference', { // Certifique-se de que a URL está correta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }), // Enviando corretamente o ID do usuário
            });

            const data = await response.json();
            console.log("Resposta da API:", data); // Adicione log para a resposta da API

            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl; // Redirecione para a URL de checkout do MercadoPago
            }
        } catch (error) {
            console.error('Erro ao criar preferência de pagamento:', error);
        }
    };

    return (
        <div className="vh-100 d-flex flex-column bg-white overflow-hidden">
            <div className="container flex-grow-1 py-1">
                <div className="row g-3 justify-content-center align-items-center flex-grow-1">
                    {/* PIX Payment */}
                    <div className="col-lg-6">
                        <div className="card h-100 border-0 shadow-lg" style={{ backgroundColor: '#2c2c2c' }}>
                            <div className="card-body text-center p-5">
                                <div className="bg-white p-4 rounded-4 mb-4">
                                    <img
                                        src="qrcode_pix.jpg"
                                        alt="QR Code PIX"
                                        className="img-fluid mb-3"
                                        style={{ maxWidth: '200px' }}
                                    />
                                    <img
                                        src="pix-logo.png"
                                        alt="PIX Logo"
                                        className="img-fluid mt-2"
                                        style={{ maxWidth: '100px' }}
                                    />
                                </div>

                                {/* Botão MercadoPago */}
                                <CheckoutButton onClick={handleCheckout} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;