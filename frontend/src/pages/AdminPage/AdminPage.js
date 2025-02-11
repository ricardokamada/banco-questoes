import React, { useContext, useState } from 'react';
import '../../styles/AdminPage.css';
import { Navigate } from 'react-router-dom';
import Sidebar from '../../components/layout/SidebarAdmin';
import { AuthContext } from '../../context/AuthContext';
import CadastroQuestoes from '../Questoes/CadastroQuestoes';
import ExcluirQuestoes from '../../pages/Questoes/ExcluirQuestoes';
import ExcluirCargos from '../../pages/Cargos/ExcluirCargos';
import CadastroCargos from '../Cargos/CadastroCargos';
import CadastroDisciplinas from '../Disciplinas/CadastroDisciplinas';
import ExcluirDisciplinas from '../Disciplinas/ExcluirDisciplinas';
import EditarQuestoes from '../Questoes/EditarQuestoes';
import PesquisarQuestoes from '../Questoes/PesquisarQuestoes';
import HomeHeader from '../../components/layout/HomeHeader';
//import { Modal, Button, Form, Alert } from 'react-bootstrap';

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
    const [showPesquisarQuestoesModal, setShowPesquisarQuestoesModal] = useState(false);


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
        <div className="d-flex flex-column"> {/* Alterado para flex-column para o header ficar acima */}
            <HomeHeader titulo="Painel Administrativo" /> {/* ✅ Agora renderizado no topo */}
            
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                    <h1 className="text-center mb-4">Dashboard</h1>
                    
                    {/* Área principal */}
                    <div className="grid-container">
                        <div className="quadrant">
                            <h2>Cadastrar</h2>
                            <button className="btn btn-secondary mb-2">Cadastrar Questão</button>
                            <button className="btn btn-secondary mb-2">Cadastrar Cargos</button>
                            <button className="btn btn-secondary">Cadastrar Disciplinas</button>
                        </div>
                        <div className="quadrant">
                            <h2>Editar</h2>
                            <button className="btn btn-warning mb-2">Editar Questão</button>
                            <button className="btn btn-warning mb-2">Editar Cargos</button>
                            <button className="btn btn-warning">Editar Disciplinas</button>
                        </div>
                        <div className="quadrant">
                            <h2>Excluir</h2>
                            <button className="btn btn-danger mb-2">Excluir Questão</button>
                            <button className="btn btn-danger mb-2">Excluir Cargos</button>
                            <button className="btn btn-danger">Excluir Disciplinas</button>
                        </div>
                        <div className="quadrant">
                            <h2>Pesquisar</h2>
                            <button className="btn btn-info mb-2">Pesquisar Questão</button>
                            <button className="btn btn-info mb-2">Pesquisar Cargos</button>
                            <button className="btn btn-info">Pesquisar Disciplinas</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;