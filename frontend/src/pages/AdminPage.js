import React, { useContext, useState } from 'react'; // Certifique-se de importar useState
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/SidebarAdmin';
import { AuthContext } from '../context/AuthContext';
import CadastroQuestoes from '../components/CadastroQuestoes';
import ExcluirQuestoes from '../components/ExcluirQuestoes';

const AdminPage = () => {
  const { user, loading } = useContext(AuthContext);

  // Declarar todos os hooks no topo do componente
  const [showButtons, setShowButtons] = useState(false);
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);

  if (loading) {
    return <div>Carregando...</div>; // Indica carregamento
  }

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
              <button
                className="btn btn-danger"
                onClick={() => setShowExcluirModal(true)}
              >
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
