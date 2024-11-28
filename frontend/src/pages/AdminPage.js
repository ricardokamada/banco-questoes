import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== 'admin') {
    return <h1>Acesso negado. Somente administradores podem acessar esta página.</h1>;
  }

  return (
    <Container className="mt-5">
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Esta é a página de administração.</p>
      <Button variant="danger" onClick={handleLogout}>
        Sair
      </Button>
    </Container>
  );
};

export default AdminPage;
