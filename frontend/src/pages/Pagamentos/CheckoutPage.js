import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { user, loading } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    if (loading) {
        return <div className="text-center py-5">Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleCheckout = async () => {
        setIsLoading(true);
    
        try {
            console.log("Enviando requisição para o backend...");
    
            const response = await axios.post('http://localhost:3000/api/checkout/create_preference');
    
            console.log("Resposta do backend:", response.data);
    
            if (response.data && response.data.ticket_url) {
                console.log("Redirecionando para:", response.data.ticket_url);
                window.location.href = response.data.ticket_url; // Redireciona para pagamento
            } else {
                alert('Erro: O backend não retornou a URL de pagamento.');
            }
        } catch (error) {
            console.error('Erro ao criar preferência de pagamento:', error);
            alert('Erro ao processar o pagamento. Verifique sua conexão.');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="card p-4 shadow-lg text-center" style={{ maxWidth: '500px' }}>
                <h2 className="mb-3">Finalize sua compra</h2>
                <p className="text-muted">
                    Garantimos total segurança e praticidade no pagamento. Com PIX, seu pagamento é confirmado
                    instantaneamente e você tem acesso ao conteúdo imediatamente.
                </p>

                <ul className="list-group list-group-flush text-start mb-3">
                    <li className="list-group-item">✔ Pagamento seguro com PIX</li>
                    <li className="list-group-item">✔ Confirmação instantânea</li>
                    <li className="list-group-item">✔ Acesso imediato ao conteúdo</li>
                </ul>

                <button 
                    className="btn btn-primary w-100 mt-3" 
                    onClick={handleCheckout} 
                    disabled={isLoading}
                >
                    {isLoading ? 'Processando...' : 'Pagar com Pix'}
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
