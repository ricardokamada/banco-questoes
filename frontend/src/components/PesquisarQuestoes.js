import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Pagination, Form } from 'react-bootstrap';
import api from '../services/api';

const PesquisarQuestoes = ({ show, onHide }) => {
    const [disciplinas, setDisciplinas] = useState([]); // Lista de disciplinas
    const [questoes, setQuestoes] = useState([]); // Questões da disciplina escolhida
    const [selectedDisciplina, setSelectedDisciplina] = useState(null); // Disciplina selecionada
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas

    // Carregar as disciplinas ao abrir o modal
    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await api.get('/disciplinas');
                setDisciplinas(response.data);
            } catch (error) {
                console.error('Erro ao carregar disciplinas:', error);
            }
        };

        if (show) {
            fetchDisciplinas();
        }
    }, [show]);

    // Buscar questões da disciplina selecionada
    const fetchQuestoes = async (disciplinaId, page = 1) => {
        try {
            const response = await api.get(`/questoes/disciplina/${disciplinaId}`, {
                params: { page },
            });
            setQuestoes(response.data.questoes);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar questões:', error);
        }
    };

    const handleDisciplinaSelect = (disciplinaId) => {
        setSelectedDisciplina(disciplinaId);
        fetchQuestoes(disciplinaId); // Carregar as questões da disciplina selecionada
    };

    const handlePageChange = (page) => {
        if (selectedDisciplina) {
            fetchQuestoes(selectedDisciplina, page);
        }
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>Pesquisar Questões</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Seleção de Disciplina */}
                <Form.Group controlId="selectDisciplina" className="mb-3">
                    <Form.Label>Selecione uma Disciplina</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={(e) => handleDisciplinaSelect(e.target.value)}
                    >
                        <option value="">Escolha uma disciplina...</option>
                        {disciplinas.map((disciplina) => (
                            <option key={disciplina.disciplina_id} value={disciplina.disciplina_id}>
                                {disciplina.nome_disciplina}
                            </option>
                        ))}
                    </Form.Control>
                    {/* Botão Exibir Questões */}
                    <Button
                        variant="primary"
                        className="mt-3"
                        disabled={!selectedDisciplina} // Desabilitado até que uma disciplina seja selecionada
                        onClick={() => fetchQuestoes(selectedDisciplina)} // Buscar questões
                    >
                        Exibir Questões
                    </Button>
                </Form.Group>


                {/* Tabela de Questões */}
                {questoes.length > 0 && (
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Questão</th>
                                    <th>Ano</th>
                                    <th>Banca</th>
                                    <th>Disciplina</th>
                                    <th>Cargo</th>
                                    <th>Alternativa A</th>
                                    <th>Alternativa B</th>
                                    <th>Alternativa C</th>
                                    <th>Alternativa D</th>
                                    <th>Alternativa E</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questoes.map((questao) => (
                                    <tr key={questao.id}>
                                        <td>{questao.id}</td>
                                        <td>{questao.questao}</td>
                                        <td>{questao.ano}</td>
                                        <td>{questao.banca}</td>
                                        <td>{questao.disciplina}</td>
                                        <td>{questao.cargo}</td>
                                        <td>{questao.alternativa_a}</td>
                                        <td>{questao.alternativa_b}</td>
                                        <td>{questao.alternativa_c}</td>
                                        <td>{questao.alternativa_d}</td>
                                        <td>{questao.alternativa_e}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Paginação */}
                        <Pagination>
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PesquisarQuestoes;
