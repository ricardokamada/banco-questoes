import React, { useContext, useEffect } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext'; // Importa o contexto de autenticação
import CadastroQuestoes from '../components/CadastroQuestoes';

const AdminPage = () => {
    const { user } = useContext(AuthContext);

    // Valida o token diretamente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login'; // Redireciona para login se não houver token
        }
    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <Routes>
                    <Route path="cadastrar" element={<CadastroQuestoes />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;
