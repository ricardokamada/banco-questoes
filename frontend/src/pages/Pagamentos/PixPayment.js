import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckoutButton from '../../components/common/CheckoutButton'; // Certifique-se do caminho correto

const PaymentPage = () => {
    const handleWhatsAppConfirmation = () => {
        const message = encodeURIComponent("Olá! Gostaria de confirmar meu pagamento.");
        window.open(`https://wa.me/5516996176613?text=${message}`, '_blank');
    };

    return (
        <div className="vh-100 d-flex flex-column bg-white overflow-hidden">
            <div className="container flex-grow-1 py-1">
                <div className="text-center mb-5">
                    <h1 className="display-5 mb-4 text-dark fw-bold">Escolha seu método de pagamento</h1>
                </div>

                <div className="row g-3 justify-content-center align-items-center flex-grow-1">
                    {/* PIX Payment */}
                    <div className="col-lg-6">
                        <div className="card h-100 border-0 shadow-lg" style={{ backgroundColor: '#2c2c2c' }}>
                            <div className="card-body text-center p-5">
                                <h3 className="card-title mb-4 text-white fs-2 fw-bold">Pagamento via PIX</h3>
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
                                <CheckoutButton />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation Section */}
                <div className="text-center mt-5 pt-4">
                    <button
                        onClick={handleWhatsAppConfirmation}
                        className="btn btn-dark btn-md px-4 py-2 rounded-pill fw-bold fs-5 shadow"
                    >
                        <i className="bi bi-whatsapp me-3"></i>
                        Confirmar Pagamento
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
