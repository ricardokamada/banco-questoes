import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Alert, Table, Form } from 'react-bootstrap';
import api from '../services/api';

const ExcluirDisciplinas = ({ show, onHide }) => {
    const [searchTerm, setSearchTerm] = useState(''); // Busca por nome ou ID da disciplina
    const [disciplinas, setDisciplinas] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    const handleSearch = async () => {
        try {
            let response;

            if (!isNaN(searchTerm)) {
                // Busca por ID
                response = await api.get(`/disciplinas/${searchTerm}`);
                if (response.data) {
                    setDisciplinas([response.data]); // Envolvendo em array para consistência
                    setAlert({ show: false });
                } else {
                    setAlert({ show: true, variant: 'warning', message: 'Nenhuma disciplina encontrada com este ID.' });
                    setDisciplinas([]);
                }
            } else {
                // Busca por nome
                response = await api.get(`/disciplinas`, { params: { nome: searchTerm } });
                if (response.data && response.data.length > 0) {
                    setDisciplinas(response.data);
                    setAlert({ show: false });
                } else {
                    setAlert({ show: true, variant: 'warning', message: 'Nenhuma disciplina encontrada com este nome.' });
                    setDisciplinas([]);
                }
            }
            setSelectedIds([]);
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error);
            setAlert({ show: true, variant: 'danger', message: 'Erro ao buscar disciplinas. Verifique o backend.' });
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
            setAlert({ show: true, variant: 'warning', message: 'Selecione pelo menos uma disciplina para excluir.' });
            return;
        }

        try {
            for (const id of selectedIds) {
                await api.delete(`/disciplinas/${id}`);
            }
            setAlert({ show: true, variant: 'success', message: 'Disciplinas excluídas com sucesso!' });
            setDisciplinas((prevDisciplinas) => prevDisciplinas.filter((disciplina) => !selectedIds.includes(disciplina.id)));
            setSelectedIds([]);
        } catch (error) {
            console.error('Erro ao excluir disciplinas:', error);
            setAlert({ show: true, variant: 'danger', message: 'Erro ao excluir disciplinas. Verifique o backend.' });
        }
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Excluir Disciplinas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alert.show && (
                    <Alert
                        variant={alert.variant}
                        onClose={() => setAlert({ show: false, variant: '', message: '' })}
                        dismissible
                    >
                        {alert.message}
                    </Alert>
                )}
                <Form className="mb-3">
                    <Form.Group controlId="searchTerm">
                        <Form.Label>Buscar Disciplina</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o ID ou nome da disciplina"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {disciplinas.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Disciplina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disciplinas.map((disciplina) => (
                                <tr key={disciplina.disciplina_id}> {/* Usa disciplina_id como chave */}
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(disciplina.disciplina_id)} // Usa disciplina_id para seleção
                                            onChange={() => handleSelect(disciplina.disciplina_id)} // Usa disciplina_id
                                        />
                                    </td>
                                    <td>{disciplina.nome_disciplina}</td> {/* Usa nome_disciplina para exibir o nome */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                ) : (
                    <p>Nenhuma disciplina encontrada.</p>
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

export default ExcluirDisciplinas;
