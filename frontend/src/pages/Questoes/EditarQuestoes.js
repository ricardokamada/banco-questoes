import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../../services/api';

const EditarQuestoes = ({ show, onHide }) => {
    const [questaoId, setQuestaoId] = useState(''); // Armazena o ID da questão
    const [form, setForm] = useState(null); // Armazena os dados da questão para o formulário
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
    const [bancas, setBancas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [cargos, setCargos] = useState([]);

    // Carregar bancas, disciplinas e cargos ao abrir o modal
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bancasData, disciplinasData, cargosData] = await Promise.all([
                    api.get('/bancas'),
                    api.get('/disciplinas'),
                    api.get('/cargos')
                ]);

                setBancas(bancasData.data);
                setDisciplinas(disciplinasData.data);
                setCargos(cargosData.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setAlert({ show: true, variant: 'danger', message: 'Erro ao carregar dados iniciais.' });
            }
        };

        if (show) fetchData();
    }, [show]);

    // Função para buscar os dados da questão
    const fetchQuestao = async () => {
        if (!questaoId) {
            setAlert({ show: true, variant: 'warning', message: 'Por favor, insira o ID da questão.' });
            return;
        }

        try {
            const response = await api.get(`/questoes/${questaoId}`);
            const data = response.data;

            // Mapear os valores de banca, disciplina e cargo para os IDs correspondentes
            const bancaSelecionada = bancas.find((b) => b.nome_banca === data.banca);
            const disciplinaSelecionada = disciplinas.find((d) => d.nome_disciplina === data.disciplina);
            const cargoSelecionado = cargos.find((c) => c.nome_cargo === data.cargo);

            setForm({
                enunciado: data.enunciado || '',
                ano: data.ano || '',
                alternativaA: data.alternativas?.[0] || '',
                alternativaB: data.alternativas?.[1] || '',
                alternativaC: data.alternativas?.[2] || '',
                alternativaD: data.alternativas?.[3] || '',
                alternativaE: data.alternativas?.[4] || '',
                alternativaCorreta: data.alternativa_correta || '',
                bancaId: bancaSelecionada?.banca_id || '',
                disciplinaId: disciplinaSelecionada?.disciplina_id || '',
                cargoId: cargoSelecionado?.cargo_id || '',
            });

            setAlert({ show: false, variant: '', message: '' });
        } catch (error) {
            console.error('Erro ao buscar questão:', error);
            setAlert({ show: true, variant: 'danger', message: 'Questão não encontrada.' });
        }
    };

    // Função para salvar as alterações
    const handleSave = async () => {
        if (!form.bancaId || !form.disciplinaId || !form.cargoId) {
            setAlert({
                show: true,
                variant: 'danger',
                message: 'Todos os campos obrigatórios devem ser preenchidos.',
            });
            return;
        }

        try {
            await api.put(`/questoes/${questaoId}`, {
                questao: form.enunciado,
                ano_prova: form.ano,
                banca_id: form.bancaId,
                disciplina_id: form.disciplinaId,
                cargo_id: form.cargoId,
                alternativa_a: form.alternativaA,
                alternativa_b: form.alternativaB,
                alternativa_c: form.alternativaC,
                alternativa_d: form.alternativaD,
                alternativa_e: form.alternativaE,
                alternativa_correta: form.alternativaCorreta,
            });

            setAlert({ show: true, variant: 'success', message: 'Questão atualizada com sucesso!' });

            // Não chamar fetchQuestao imediatamente
            // Em vez disso, podemos fechar o modal ou limpar o formulário após um tempo
            setTimeout(() => {
                setAlert({ show: false, variant: '', message: '' });
                onHide(); // Fechar o modal após 3 segundos
            }, 3000);

        } catch (error) {
            console.error('Erro ao atualizar questão:', error);
            setAlert({ show: true, variant: 'danger', message: 'Erro ao atualizar questão.' });

            setTimeout(() => {
                setAlert({ show: false, variant: '', message: '' });
            }, 3000);
        }
    };

    // Função para lidar com as alterações no formulário
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            let updatedForm = { ...prev, [name]: value };

            // Atualizar os campos de nome com base no ID selecionado
            if (name === 'bancaId') {
                const bancaSelecionada = bancas.find((b) => b.banca_id === value);
                updatedForm.bancaNome = bancaSelecionada ? bancaSelecionada.nome_banca : '';
            }
            if (name === 'disciplinaId') {
                const disciplinaSelecionada = disciplinas.find((d) => d.disciplina_id === value);
                updatedForm.disciplinaNome = disciplinaSelecionada ? disciplinaSelecionada.nome_disciplina : '';
            }
            if (name === 'cargoId') {
                const cargoSelecionado = cargos.find((c) => c.cargo_id === value);
                updatedForm.cargoNome = cargoSelecionado ? cargoSelecionado.nome_cargo : '';
            }

            return updatedForm;
        });
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static" centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar Questão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alert.show && (
                    <Alert
                        key={alert.message} // Adicionar uma key para garantir re-renderização
                        variant={alert.variant}
                        onClose={() => setAlert({ show: false, variant: '', message: '' })}
                        dismissible
                    >
                        {alert.message}
                    </Alert>
                )}
                {!form ? (
                    <Form>
                        <Form.Group controlId="questaoId">
                            <Form.Label>ID da Questão</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o ID da questão"
                                value={questaoId}
                                onChange={(e) => setQuestaoId(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="primary" className="me-2" onClick={fetchQuestao}>
                                Buscar Questão
                            </Button>
                            <Button variant="secondary" onClick={onHide}>
                                Fechar
                            </Button>
                        </div>

                    </Form>
                ) : (
                    <Form>
                        <Form.Group controlId="enunciado">
                            <Form.Label>Enunciado</Form.Label>
                            <Form.Control
                                type="text"
                                name="enunciado"
                                value={form.enunciado}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="anoProva">
                            <Form.Label>Ano da Prova</Form.Label>
                            <Form.Control
                                type="text"
                                name="ano"
                                value={form.ano}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="bancaId" style={{ marginBottom: '20px' }}>
                            <Form.Label>Banca</Form.Label>
                            <Form.Control
                                as="select"
                                name="bancaId"
                                value={form?.bancaId || ''}
                                onChange={handleChange}
                            >
                                {bancas.map((banca) => (
                                    <option key={banca.banca_id} value={banca.banca_id}>
                                        {banca.nome_banca}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="disciplinaId" style={{ marginBottom: '20px' }}>
                            <Form.Label>Disciplina</Form.Label>
                            <Form.Control
                                as="select"
                                name="disciplinaId"
                                value={form?.disciplinaId || ''}
                                onChange={handleChange}
                            >
                                {disciplinas.map((disciplina) => (
                                    <option key={disciplina.disciplina_id} value={disciplina.disciplina_id}>
                                        {disciplina.nome_disciplina}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="cargoId" style={{ marginBottom: '20px' }}>
                            <Form.Label>Cargo</Form.Label>
                            <Form.Control
                                as="select"
                                name="cargoId"
                                value={form?.cargoId || ''}
                                onChange={handleChange}
                            >
                                {cargos.map((cargo) => (
                                    <option key={cargo.cargo_id} value={cargo.cargo_id}>
                                        {cargo.nome_cargo}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {/* Campos de alternativas */}
                        {['A', 'B', 'C', 'D', 'E'].map((letra) => (
                            <Form.Group controlId={`alternativa${letra}`} key={letra}>
                                <Form.Label>Alternativa {letra}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={`alternativa${letra}`}
                                    value={form[`alternativa${letra}`]}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        ))}

                        <Form.Group controlId="alternativaCorreta">
                            <Form.Label>Alternativa Correta</Form.Label>
                            <Form.Control
                                as="select"
                                name="alternativaCorreta"
                                value={form.alternativaCorreta}
                                onChange={handleChange}
                            >
                                {['A', 'B', 'C', 'D', 'E'].map((op) => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" onClick={handleSave}>
                            Salvar
                        </Button>
                    </Form>
                )}
            </Modal.Body>

        </Modal>
    );
};

export default EditarQuestoes;