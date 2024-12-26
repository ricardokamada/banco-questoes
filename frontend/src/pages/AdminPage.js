import React, { useContext } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext'; // Importa o contexto de autenticação
import CadastroQuestoes from '../components/CadastroQuestoes';

const AdminPage = () => {
  const { user } = useContext(AuthContext);

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
