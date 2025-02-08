import React from 'react';
import '../styles/PixPayment.css'; // Certifique-se de criar esse CSS para estilização

const PaymentPage = () => {
    return (
        <div className="payment-container light-theme">
            <h2 className="payment-title">Escolha seu método de pagamento</h2>
            <p className="payment-quote">
                "Essa é sua última chance. Depois disso, não há como voltar. Você toma a pílula azul e a história acaba. Você acorda em sua cama e acredita no que quiser acreditar. Você toma a pílula vermelha e fica no País das Maravilhas. E eu mostro a profundidade da toca do coelho." <br /><strong>- Morpheus</strong>
            </p>
            <div className="payment-methods full-width">
                {/* Pagamento via PIX */}
                <div className="payment-box expanded">
                    <h3>Pagamento via PIX</h3>
                    <p>Escaneie o QR Code abaixo para realizar o pagamento via PIX.</p>
                    <img src="qrcode_pix.jpg" alt="QR Code PIX" className="qrcode larger-qrcode" />
                    <img src="pix-logo.png" alt="PIX Logo" className="payment-logo" />
                </div>
                
                {/* Pagamento via Bitcoin Lightning Network */}
                <div className="payment-box expanded">
                    <h3>Pagamento via Bitcoin (Lightning Network)</h3>
                    <p>Escaneie o QR Code abaixo para realizar o pagamento via Lightning Network.</p>
                    <img src="Lightning-BTC.png" alt="QR Code Bitcoin" className="qrcode larger-qrcode" />
                    <img src="satoshi.png" alt="Satoshi" className="payment-logo" style={{ width: '100px', height: 'auto' }} />

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
