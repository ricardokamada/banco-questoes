import React, { useContext } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext'; // Importa o contexto de autenticação

const AdminPage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redireciona para login se o usuário não estiver autenticado
    return <Navigate to="/login" />;
  }

  return (
    <div className="d-flex">
      {/* Menu Lateral */}
      <Sidebar />

      {/* Conteúdo Dinâmico */}
      <div className="flex-grow-1 p-4">
        <Routes>
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;

