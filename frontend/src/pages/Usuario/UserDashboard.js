import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarHome from '../../components/layout/SidebarHome';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const UserDashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return; // Aguarda o carregamento do estado de autenticação
        }

        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await api.get('/user/profile');
                setUserData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        const fetchPaymentStatus = async () => {
            try {
                const response = await api.get('/user/payment-status');
                setPaymentStatus(response.data.status);
            } catch (error) {
                console.error('Erro ao buscar status do pagamento:', error);
            }
        };

        fetchUserData();
        fetchPaymentStatus();
    }, [user, loading, navigate]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <div className="text-center mt-5"><h3>Acesso negado. Faça login para continuar.</h3></div>;
    }

    if (!userData) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="d-flex">
            <div className="container mt-4">
                <h2 className="mb-4">Dashboard do Usuário</h2>
                <div className="card p-4 shadow-sm">
                    <h4>Dados do Usuário</h4>
                    <p><strong>Nome:</strong> {userData.nome}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Telefone:</strong> {userData.telefone}</p>
                    <p><strong>Validade do Plano:</strong> {userData.validadePlano}</p>
                    <h4 className="mt-4">Status do Pagamento</h4>
                    <p className={`fw-bold ${paymentStatus === 'Aprovado' ? 'text-success' : paymentStatus === 'Pendente' ? 'text-warning' : 'text-danger'}`}>{paymentStatus}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;