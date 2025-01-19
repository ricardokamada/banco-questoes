import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Alert, Table, Form } from 'react-bootstrap';
import api from '../services/api';

const ExcluirQuestoes = ({ show, onHide }) => {
    const [searchId, setSearchId] = useState(''); // Estado para busca por ID
    const [searchEnunciado, setSearchEnunciado] = useState(''); // Estado para busca por enunciado
    const [questoes, setQuestoes] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    const handleSearch = async () => {
        try {
            let response;
    
            if (searchId) {
                // Busca por ID
                response = await api.get(`/questoes/${searchId}`);
                if (response.data) {
                    setQuestoes([response.data]); // Envolve em array para consistência
                    setAlert({ show: false }); // Remove qualquer alerta
                }
            } else if (searchEnunciado) {
                // Busca por enunciado
                response = await api.get(`/questoes`, { params: { texto: searchEnunciado } });
                if (response.data && response.data.length > 0) {
                    setQuestoes(response.data);
                    setAlert({ show: false }); // Remove qualquer alerta
                } else {
                    setAlert({ show: true, variant: 'warning', message: 'Nenhuma questão encontrada com este enunciado.' });
                    setQuestoes([]);
                }
            } else {
                setAlert({ show: true, variant: 'danger', message: 'Preencha pelo menos um campo de busca.' });
            }
            setSelectedIds([]);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Tratamento específico para 404
                setAlert({ show: true, variant: 'warning', message: 'Questão não encontrada com este ID.' });
                setQuestoes([]);
            } else {
                // Outros erros
                console.error('Erro ao buscar questões:', error);
                setAlert({ show: true, variant: 'danger', message: 'Erro ao buscar questões. Verifique o backend.' });
            }
        }
    };
    
    

    const handleSelect = (id) => {
        setSelectedIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            setAlert({ show: true, variant: 'warning', message: 'Selecione pelo menos uma questão para excluir.' });
            return;
        }

        try {
            for (const id of selectedIds) {
                if (id === undefined || id === null) {
                    console.error(`ID inválido detectado: ${id}`);
                    continue; // Pule IDs inválidos
                }
                await api.delete(`/questoes/${id}`);
            }
            setAlert({ show: true, variant: 'success', message: 'Questões excluídas com sucesso!' });
            setQuestoes((prevQuestoes) => prevQuestoes.filter((q) => !selectedIds.includes(q.id)));
            setSelectedIds([]);
        } catch (error) {
            console.error('Erro ao excluir questão:', error);
            setAlert({ show: true, variant: 'danger', message: 'Erro ao excluir questões. Verifique o backend.' });
        }
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Excluir Questões</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alert.show && (
                    <Alert variant={alert.variant} onClose={() => setAlert({ show: false, variant: '', message: '' })} dismissible>
                        {alert.message}
                    </Alert>
                )}
                <Form className="mb-3">
                    <Form.Group controlId="searchId" className="mb-3">
                        <Form.Label>Busca por ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o ID da questão"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="searchEnunciado">
                        <Form.Label>Busca por Enunciado</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o enunciado da questão"
                            value={searchEnunciado}
                            onChange={(e) => setSearchEnunciado(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {questoes.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Questão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questoes.map((questao) => (
                                <tr key={questao.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(questao.id)}
                                            onChange={() => handleSelect(questao.id)}
                                        />
                                    </td>
                                    <td>{questao.enunciado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>Nenhuma questão encontrada.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSearch}>
                    Buscar
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Excluir Selecionadas
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExcluirQuestoes;
