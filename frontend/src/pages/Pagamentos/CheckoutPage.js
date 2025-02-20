import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckoutButton from '../../components/common/CheckoutButton'; // Certifique-se do caminho correto

const CheckoutPage = () => {


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
                                <CheckoutButton />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
