import React from 'react';

const PixPayment = () => {
  const phoneNumber = "16996176613";
  const whatsappMessage = encodeURIComponent(
    "Olá, realizei o pagamento via PIX e gostaria de ter acesso às questões."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #eef2ff 100%)',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '32rem',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: '#4338ca10',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            📱
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#312e81',
            marginBottom: '0.5rem'
          }}>
            Libere seu Acesso às Questões!
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            Faça o pagamento via PIX e tenha acesso imediato ao nosso banco de questões exclusivo
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {/* QR Code Container */}
          <div style={{
            background: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src="/qrcode_pix.jpg"
                alt="QR Code para pagamento PIX"
                style={{
                  display: 'block',
                  maxWidth: '280px',
                  width: '100%',
                  margin: '0 auto',
                  borderRadius: '0.5rem'
                }}
              />
            </div>
          </div>

          {/* Alert */}
          <div style={{
            background: '#4338ca10',
            border: '1px solid #4338ca20',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#4338ca',
            fontSize: '0.875rem'
          }}>
            🚀 Após realizar o pagamento, clique no botão abaixo para confirmar via WhatsApp e liberar seu acesso imediatamente!
          </div>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#25D366',
              color: 'white',
              textDecoration: 'none',
              padding: '0.875rem 1.5rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(37, 211, 102, 0.2)',
              marginBottom: '1rem'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(37, 211, 102, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(37, 211, 102, 0.2)';
            }}
          >
            Confirmar Pagamento via WhatsApp
          </a>

          {/* Help Text */}
          <p style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280',
            marginTop: '1rem'
          }}>
            Precisa de ajuda? Entre em contato conosco pelo WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default PixPayment;