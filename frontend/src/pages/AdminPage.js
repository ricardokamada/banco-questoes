import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';
import CadastroQuestoes from '../components/CadastroQuestoes';
import ExcluirQuestoes from '../components/ExcluirQuestoes'; // Importar o novo componente

const AdminPage = () => {
    const { user } = useContext(AuthContext);
    const [showButtons, setShowButtons] = useState(false); // Controla a exibição dos botões
    const [showCadastroModal, setShowCadastroModal] = useState(false); // Controla o modal de cadastro
    const [showExcluirModal, setShowExcluirModal] = useState(false); // Controla o modal de exclusão

    // Valida o token diretamente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="d-flex">
            <Sidebar onQuestaoClick={() => setShowButtons(true)} />
            <div className="flex-grow-1 p-4">
                {showButtons ? (
                    <div>
                        <h1>Gerenciamento de Questões</h1>
                        <div className="d-flex flex-column align-items-start">
                            <button
                                className="btn btn-primary mb-2"
                                onClick={() => setShowCadastroModal(true)}
                            >
                                Cadastrar Questão
                            </button>
                            <button className="btn btn-danger" onClick={() => setShowExcluirModal(true)}>
                                Excluir Questão
                            </button>
                        </div>
                    </div>
                ) : (
                    <h1>Bem-vindo ao Painel Administrativo</h1>
                )}

                {/* Modais */}
                {showCadastroModal && (
                    <CadastroQuestoes
                        show={showCadastroModal}
                        onHide={() => setShowCadastroModal(false)}
                    />
                )}
                {showExcluirModal && (
                    <ExcluirQuestoes
                        show={showExcluirModal}
                        onHide={() => setShowExcluirModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
