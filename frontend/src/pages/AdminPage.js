import React, { useContext, useState } from 'react';
import '../styles/AdminPage.css';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/SidebarAdmin';
import { AuthContext } from '../context/AuthContext';
import CadastroQuestoes from '../components/CadastroQuestoes';
import ExcluirQuestoes from '../components/ExcluirQuestoes';
import ExcluirCargos from '../components/ExcluirCargos';
import CadastroCargos from '../components/CadastroCargos';
import CadastroDisciplinas from '../components/CadastroDisciplinas';
import ExcluirDisciplinas from '../components/ExcluirDisciplinas';
import EditarQuestoes from '../components/EditarQuestoes';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const AdminPage = () => {
    const { user, loading } = useContext(AuthContext);

    const [showCadastroModal, setShowCadastroModal] = useState(false);
    const [showExcluirQuestoesModal, setShowExcluirQuestoesModal] = useState(false);
    const [showExcluirCargosModal, setShowExcluirCargosModal] = useState(false);
    const [showExcluirDisciplinasModal, setShowExcluirDisciplinasModal] = useState(false);
    const [showCadastroCargosModal, setShowCadastroCargosModal] = useState(false);
    const [showCadastroDisciplinasModal, setShowCadastroDisciplinasModal] = useState(false);
    const [showEditarQuestoesModal, setShowEditarQuestoesModal] = useState(false); // Modal único
    const [editQuestaoId, setEditQuestaoId] = useState(''); // Armazena o ID da questão para edição
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleFetchQuestao = () => {
        if (!editQuestaoId) {
            setAlert({ show: true, variant: 'warning', message: 'Por favor, insira o ID da questão.' });
            return;
        }
        setShowEditarQuestoesModal(true); // Abre o modal de edição
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <h1 className="text-center mb-4">Gerenciamento de Itens</h1>
                <div className="grid-container">
                    {/* Quadrante 1 - Cadastrar */}
                    <div className="quadrant">
                        <h2>Cadastrar</h2>
                        <button className="btn btn-secondary mb-2" onClick={() => setShowCadastroModal(true)}>
                            Cadastrar Questão
                        </button>
                        <button className="btn btn-secondary mb-2" onClick={() => setShowCadastroCargosModal(true)}>
                            Cadastrar Cargos
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowCadastroDisciplinasModal(true)}>
                            Cadastrar Disciplinas
                        </button>
                    </div>

                    {/* Quadrante 2 - Editar */}
                    <div className="quadrant">
                        <h2>Editar</h2>
                        <button
                            className="btn btn-warning mb-2"
                            onClick={() => setShowEditarQuestoesModal(true)}
                        >
                            Editar Questão
                        </button>
                        <button className="btn btn-warning mb-2">Editar Cargos</button>
                        <button className="btn btn-warning">Editar Disciplinas</button>
                    </div>

                    {/* Quadrante 3 - Excluir */}
                    <div className="quadrant">
                        <h2>Excluir</h2>
                        <button className="btn btn-danger mb-2" onClick={() => setShowExcluirQuestoesModal(true)}>
                            Excluir Questão
                        </button>
                        <button className="btn btn-danger mb-2" onClick={() => setShowExcluirCargosModal(true)}>
                            Excluir Cargos
                        </button>
                        <button className="btn btn-danger" onClick={() => setShowExcluirDisciplinasModal(true)}>
                            Excluir Disciplinas
                        </button>
                    </div>

                    {/* Quadrante 4 - Pesquisar */}
                    <div className="quadrant">
                        <h2>Pesquisar</h2>
                        <button className="btn btn-info mb-2">Pesquisar Questão</button>
                        <button className="btn btn-info mb-2">Pesquisar Cargos</button>
                        <button className="btn btn-info">Pesquisar Disciplinas</button>
                    </div>
                </div>
            </div>

            {/* Modais */}
            {showCadastroModal && (
                <CadastroQuestoes show={showCadastroModal} onHide={() => setShowCadastroModal(false)} />
            )}
            {showExcluirQuestoesModal && (
                <ExcluirQuestoes show={showExcluirQuestoesModal} onHide={() => setShowExcluirQuestoesModal(false)} />
            )}
            {showExcluirCargosModal && (
                <ExcluirCargos show={showExcluirCargosModal} onHide={() => setShowExcluirCargosModal(false)} />
            )}
            {showExcluirDisciplinasModal && (
                <ExcluirDisciplinas
                    show={showExcluirDisciplinasModal}
                    onHide={() => setShowExcluirDisciplinasModal(false)}
                />
            )}
            {showCadastroCargosModal && (
                <CadastroCargos show={showCadastroCargosModal} onHide={() => setShowCadastroCargosModal(false)} />
            )}
            {showCadastroDisciplinasModal && (
                <CadastroDisciplinas
                    show={showCadastroDisciplinasModal}
                    onHide={() => setShowCadastroDisciplinasModal(false)}
                />
            )}
            {showEditarQuestoesModal && (
                <EditarQuestoes
                    show={showEditarQuestoesModal}
                    onHide={() => {
                        setShowEditarQuestoesModal(false);
                        setEditQuestaoId(''); // Reseta o ID após fechar
                    }}
                    questaoId={editQuestaoId}
                    onFetchQuestao={handleFetchQuestao}
                />
            )}
        </div>
    );
};

export default AdminPage;
