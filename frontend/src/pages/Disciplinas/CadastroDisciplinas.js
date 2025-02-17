import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const CadastroDisciplinas = ({ show, onHide }) => {
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const handleSave = async () => {
    if (!nomeDisciplina.trim()) {
      setAlert({ show: true, variant: 'danger', message: 'O nome da disciplina é obrigatório!' });
      return;
    }

    try {
      await api.post('/disciplinas', { nome_disciplina: nomeDisciplina.trim() });
      setAlert({ show: true, variant: 'success', message: 'Disciplina cadastrado com sucesso!' });
      setTimeout(() => {
        setAlert({ show: false, variant: '', message: '' });
        onHide();
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar disciplina :', error.response?.data || error.message);
      setAlert({ show: true, variant: 'danger', message: 'Erro ao cadastrar disciplina. Tente novamente.' });
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Nova Disciplina</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.show && (
          <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false, variant: '', message: '' })}>
            {alert.message}
          </Alert>
        )}
        <div className="mb-3">
          <label htmlFor="nomeDisciplina" className="form-label">Nome da disciplina</label>
          <input
            type="text"
            className="form-control"
            id="nomeDisciplina"
            value={nomeDisciplina}
            onChange={(e) => setNomeDisciplina(e.target.value)}
            placeholder="Digite o nome da disciplina"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CadastroDisciplinas;
