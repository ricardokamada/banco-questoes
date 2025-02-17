import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Alert, Nav, Tab, Row, Col, Badge } from 'react-bootstrap';
import api from '../../services/api';

const CadastroQuestoes = ({ show, onHide }) => {
    const [form, setForm] = useState({
        questao: '',
        banca: '',
        disciplina: '',
        cargo: '',
        ano: '',
        alternativaA: '',
        alternativaB: '',
        alternativaC: '',
        alternativaD: '',
        alternativaE: '',
        alternativaCorreta: 'A'
    });

    const [bancas, setBancas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('detalhes');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bancasRes, disciplinasRes, cargosRes] = await Promise.all([
                    api.get('/bancas'),
                    api.get('/disciplinas'),
                    api.get('/cargos')
                ]);
                setBancas(bancasRes.data);
                setDisciplinas(disciplinasRes.data);
                setCargos(cargosRes.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                showAlert('danger', 'Erro ao carregar dados básicos. Tente recarregar a página.');
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (errors[name]) setErrors({...errors, [name]: null});
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'questao', 'banca', 'disciplina', 'cargo', 'ano',
            'alternativaA', 'alternativaB', 'alternativaC', 'alternativaD'
        ];

        requiredFields.forEach(field => {
            if (!form[field]?.trim()) {
                newErrors[field] = 'Campo obrigatório';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showAlert = (variant, message) => {
        setAlert({ show: true, variant, message });
        setTimeout(() => setAlert({...alert, show: false}), 5000);
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        const banca = bancas.find(b => b.nome_banca === form.banca);
        const disciplina = disciplinas.find(d => d.nome_disciplina === form.disciplina);
        const cargo = cargos.find(c => c.nome_cargo === form.cargo);

        const payload = {
            questao: form.questao.trim(),
            banca_id: banca?.banca_id,
            disciplina_id: disciplina?.disciplina_id,
            cargo_id: cargo?.cargo_id,
            ano_prova: form.ano.trim(),
            alternativa_correta: form.alternativaCorreta,
            alternativa_a: form.alternativaA.trim(),
            alternativa_b: form.alternativaB.trim(),
            alternativa_c: form.alternativaC.trim(),
            alternativa_d: form.alternativaD.trim(),
            alternativa_e: form.alternativaE.trim()
        };

        try {
            await api.post('/questoes/', payload);
            showAlert('success', 'Questão cadastrada com sucesso!');
            setForm({
                questao: '', banca: '', disciplina: '', cargo: '', ano: '',
                alternativaA: '', alternativaB: '', alternativaC: '', alternativaD: '', alternativaE: '',
                alternativaCorreta: 'A'
            });
            setActiveTab('detalhes');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            showAlert('danger', error.response?.data?.message || 'Erro ao salvar questão');
        }
    };

    const renderAlternativa = (letra) => (
        <div className="mb-3 position-relative" key={letra}>
            <div className="input-group">
                <span className="input-group-text" style={{ width: '40px' }}>
                    {letra}
                    {form.alternativaCorreta === letra && (
                        <Badge bg="success" className="ms-2" pill>✓</Badge>
                    )}
                </span>
                <input
                    type="text"
                    className={`form-control ${errors[`alternativa${letra}`] ? 'is-invalid' : ''}`}
                    name={`alternativa${letra}`}
                    value={form[`alternativa${letra}`]}
                    onChange={handleChange}
                    placeholder={`Texto da alternativa ${letra}`}
                />
                {errors[`alternativa${letra}`] && (
                    <div className="invalid-feedback">{errors[`alternativa${letra}`]}</div>
                )}
            </div>
        </div>
    );

    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="xl" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>📝 Cadastro de Questão</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                    <Nav variant="tabs" className="mb-4">
                        <Nav.Item>
                            <Nav.Link eventKey="detalhes">Detalhes da Questão</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="alternativas">Alternativas</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    {alert.show && (
                        <Alert variant={alert.variant} dismissible onClose={() => setAlert({...alert, show: false})}>
                            {alert.message}
                        </Alert>
                    )}

                    <Tab.Content>
                        <Tab.Pane eventKey="detalhes">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Enunciado da Questão *</label>
                                    <textarea
                                        className={`form-control ${errors.questao ? 'is-invalid' : ''}`}
                                        name="questao"
                                        value={form.questao}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Digite o enunciado completo da questão..."
                                    />
                                    {errors.questao && <div className="invalid-feedback">{errors.questao}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Banca *</label>
                                    <select
                                        className={`form-select ${errors.banca ? 'is-invalid' : ''}`}
                                        name="banca"
                                        value={form.banca}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione a banca...</option>
                                        {bancas.map(b => (
                                            <option key={b.banca_id} value={b.nome_banca}>{b.nome_banca}</option>
                                        ))}
                                    </select>
                                    {errors.banca && <div className="invalid-feedback">{errors.banca}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Ano da Prova *</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.ano ? 'is-invalid' : ''}`}
                                        name="ano"
                                        value={form.ano}
                                        onChange={handleChange}
                                        placeholder="Ex: 2023"
                                    />
                                    {errors.ano && <div className="invalid-feedback">{errors.ano}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Disciplina *</label>
                                    <select
                                        className={`form-select ${errors.disciplina ? 'is-invalid' : ''}`}
                                        name="disciplina"
                                        value={form.disciplina}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione a disciplina...</option>
                                        {disciplinas.map(d => (
                                            <option key={d.disciplina_id} value={d.nome_disciplina}>{d.nome_disciplina}</option>
                                        ))}
                                    </select>
                                    {errors.disciplina && <div className="invalid-feedback">{errors.disciplina}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Cargo *</label>
                                    <select
                                        className={`form-select ${errors.cargo ? 'is-invalid' : ''}`}
                                        name="cargo"
                                        value={form.cargo}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione o cargo...</option>
                                        {cargos.map(c => (
                                            <option key={c.cargo_id} value={c.nome_cargo}>{c.nome_cargo}</option>
                                        ))}
                                    </select>
                                    {errors.cargo && <div className="invalid-feedback">{errors.cargo}</div>}
                                </div>
                            </div>
                        </Tab.Pane>

                        <Tab.Pane eventKey="alternativas">
                            <div className="row g-3">
                                <div className="col-12">
                                    <p className="text-muted small mb-4">
                                        Preencha pelo menos as alternativas A a D. Marque a correta selecionando ao lado.
                                    </p>
                                    
                                    <div className="mb-4">
                                        <label className="form-label">Alternativa Correta</label>
                                        <select
                                            className="form-select"
                                            name="alternativaCorreta"
                                            value={form.alternativaCorreta}
                                            onChange={handleChange}
                                        >
                                            {['A', 'B', 'C', 'D', 'E'].map(letra => (
                                                <option key={letra} value={letra}>Alternativa {letra}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {['A', 'B', 'C', 'D', 'E'].map(renderAlternativa)}
                                </div>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="outline-secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Salvar Questão
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CadastroQuestoes;