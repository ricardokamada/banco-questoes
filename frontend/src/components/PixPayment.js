import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPage = () => {
    const handleWhatsAppConfirmation = () => {
        const message = encodeURIComponent("Olá! Gostaria de confirmar meu pagamento.");
        window.open(`https://wa.me/5516996176613?text=${message}`, '_blank');
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-white">
            <div className="container flex-grow-1 py-1">
                <div className="text-center mb-5">
                    <h1 className="display-3 mb-4 text-dark fw-bold">Escolha seu método de pagamento</h1>
                    <blockquote className="blockquote mb-5">
                        <p className="lead text-secondary fs-6">
                            "Essa é sua última chance. Depois disso, não há como voltar. Você toma a pílula azul e a história acaba. Você acorda em sua cama e acredita no que quiser acreditar. Você toma a pílula vermelha e fica no País das Maravilhas. E eu mostro a profundidade da toca do coelho."
                        </p>
                        <footer className="blockquote-footer text-dark mt-3 fs-5">
                            <cite title="Morpheus">Morpheus</cite>
                        </footer>
                    </blockquote>
                </div>

                <div className="row g-5 justify-content-center align-items-stretch">
                    {/* PIX Payment */}
                    <div className="col-lg-6">
                        <div className="card h-100 border-0 shadow-lg" style={{ backgroundColor: '#2c2c2c' }}>
                            <div className="card-body text-center p-5">
                                <h3 className="card-title mb-4 text-white fs-2 fw-bold">Pagamento via PIX</h3>
                                <div className="bg-white p-4 rounded-4 mb-4">
                                    <img 
                                        src="qrcode_pix.jpg" 
                                        alt="QR Code PIX" 
                                        className="img-fluid mb-4"
                                        style={{ maxWidth: '280px' }}
                                    />
                                    <img 
                                        src="pix-logo.png" 
                                        alt="PIX Logo" 
                                        className="img-fluid mt-3"
                                        style={{ maxWidth: '140px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bitcoin Payment */}
                    <div className="col-lg-6">
                        <div className="card h-100 border-0 shadow-lg" style={{ backgroundColor: '#2c2c2c' }}>
                            <div className="card-body text-center p-5">
                                <h3 className="card-title mb-4 text-white fs-2 fw-bold">Bitcoin Lightning Network</h3>
                                <div className="bg-white p-4 rounded-4 mb-4">
                                    <img 
                                        src="Lightning-BTC.jpg" 
                                        alt="QR Code Bitcoin" 
                                        className="img-fluid mb-4"
                                        style={{ maxWidth: '280px' }}
                                    />
                                    <img 
                                        src="satoshi.png" 
                                        alt="Satoshi" 
                                        className="img-fluid mt-3"
                                        style={{ maxWidth: '140px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation Section */}
                <div className="text-center mt-5 pt-4">
                    <button 
                        onClick={handleWhatsAppConfirmation}
                        className="btn btn-dark btn-lg px-5 py-3 rounded-pill fw-bold fs-4 shadow"
                        style={{
                            letterSpacing: '1.5px',
                            transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        <i className="bi bi-whatsapp me-3"></i>
                        Confirmar Pagamento
                    </button>
                    
                    <div className="mt-4 p-3 bg-light rounded-3 mx-auto" style={{maxWidth: '800px'}}>
                        <p className="text-secondary mb-0 small">
                            "Os únicos métodos de pagamento aceitos são PIX e Bitcoin. Esta plataforma não possui um gateway de pagamento, pois assim torna a operação mais simples, barata e eficiente. O botão disponível serve apenas para enviar uma mensagem para o desenvolvedor informando seu pagamento e liberar o acesso à plataforma."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;