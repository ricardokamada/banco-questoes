import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const CadastroCargos = ({ show, onHide }) => {
  const [nomeCargo, setNomeCargo] = useState('');
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const handleSave = async () => {
    if (!nomeCargo.trim()) {
      setAlert({ show: true, variant: 'danger', message: 'O nome do cargo é obrigatório!' });
      return;
    }

    try {
      await api.post('/cargos', { nome_cargo: nomeCargo.trim() });
      setAlert({ show: true, variant: 'success', message: 'Cargo cadastrado com sucesso!' });
      setTimeout(() => {
        setAlert({ show: false, variant: '', message: '' });
        onHide();
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar cargo:', error.response?.data || error.message);
      setAlert({ show: true, variant: 'danger', message: 'Erro ao cadastrar cargo. Tente novamente.' });
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Novo Cargo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.show && (
          <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false, variant: '', message: '' })}>
            {alert.message}
          </Alert>
        )}
        <div className="mb-3">
          <label htmlFor="nomeCargo" className="form-label">Nome do Cargo</label>
          <input
            type="text"
            className="form-control"
            id="nomeCargo"
            value={nomeCargo}
            onChange={(e) => setNomeCargo(e.target.value)}
            placeholder="Digite o nome do cargo"
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

export default CadastroCargos;
