import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Alert, Table, Form } from 'react-bootstrap';
import api from '../services/api';

const ExcluirQuestoes = ({ show, onHide }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [questoes, setQuestoes] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    const handleSearch = async () => {
        try {
            let response;
            if (!isNaN(searchTerm)) {
                // Buscar por ID
                response = await api.get(`/questoes/${searchTerm}`);
                setQuestoes([response.data]); // Envolve em um array para exibição uniforme
            } else {
                // Buscar por texto do enunciado
                response = await api.get(`/questoes`, { params: { texto: searchTerm } });
                setQuestoes(response.data);
            }
            setSelectedIds([]); // Limpa seleções anteriores
            if (response.data.length === 0 || !response.data) {
                setAlert({ show: true, variant: 'warning', message: 'Nenhuma questão encontrada.' });
            }
        } catch (error) {
            console.error('Erro ao buscar questões:', error);
            setAlert({ show: true, variant: 'danger', message: 'Erro ao buscar questões. Verifique o backend.' });
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
                await api.delete(`/questoes/${id}`);
            }
            setAlert({ show: true, variant: 'success', message: 'Questões excluídas com sucesso!' });
            setQuestoes((prevQuestoes) => prevQuestoes.filter((q) => !selectedIds.includes(q.id)));
            setSelectedIds([]);
            setTimeout(() => setAlert({ show: false, variant: '', message: '' }), 2000);
        } catch (error) {
            console.error('Erro ao excluir questão:', error);
            setAlert({ show: true, variant: 'danger', message: 'Erro ao excluir questões. Verifique o backend.' });
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
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
                    <Form.Group controlId="searchTerm">
                        <Form.Label>Buscar Questão</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o ID ou parte do enunciado"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                    <td>{questao.questao}</td>
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
