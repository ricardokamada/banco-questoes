import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

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

    useEffect(() => {
        const fetchBancas = async () => {
            try {
                const response = await api.get('/bancas');
                setBancas(response.data);
            } catch (error) {
                console.error('Erro ao buscar bancas:', error);
                alert('Erro ao carregar bancas. Verifique o backend.');
            }
        };

        const fetchDisciplinas = async () => {
            try {
                const response = await api.get('/disciplinas');
                setDisciplinas(response.data);
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
                alert('Erro ao carregar disciplinas. Verifique o backend.');
            }
        };

        const fetchCargos = async () => {
            try {
                const response = await api.get('/cargos');
                setCargos(response.data);
            } catch (error) {
                console.error('Erro ao buscar cargos:', error);
                alert('Erro ao carregar cargos. Verifique o backend.');
            }
        };

        fetchBancas();
        fetchDisciplinas();
        fetchCargos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSave = async () => {
        const banca = bancas.find((b) => b.nome_banca === form.banca);
        const disciplina = disciplinas.find((d) => d.nome_disciplina === form.disciplina);
        const cargo = cargos.find((c) => c.nome_cargo === form.cargo);

        const missingFields = [];
        if (!banca) missingFields.push('banca_id');
        if (!disciplina) missingFields.push('disciplina_id');
        if (!cargo) missingFields.push('cargo_id');
        if (!form.questao.trim()) missingFields.push('questao');
        if (!form.ano.trim()) missingFields.push('ano_prova');
        if (!form.alternativaA.trim()) missingFields.push('alternativa_a');
        if (!form.alternativaB.trim()) missingFields.push('alternativa_b');
        if (!form.alternativaC.trim()) missingFields.push('alternativa_c');
        if (!form.alternativaD.trim()) missingFields.push('alternativa_d');

        if (missingFields.length > 0) {
            setAlert({ show: true, variant: 'danger', message: `Erro: Campos obrigatórios ausentes - ${missingFields.join(', ')}` });
            return;
        }

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
            const response = await api.post('http://localhost:3000/api/questoes/', payload);
            setAlert({ show: true, variant: 'success', message: 'Questão salva com sucesso!' });
            setTimeout(() => {
                setAlert({ show: false, variant: '', message: '' });
                onHide();
            }, 2000);
        } catch (error) {
            console.error('Erro ao salvar questão:', error.response?.data || error.message);
            setAlert({ show: true, variant: 'danger', message: 'Erro ao salvar questão. Verifique os dados e tente novamente.' });
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro de Questões</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alert.show && (
                    <Alert variant={alert.variant} onClose={() => setAlert({ show: false, variant: '', message: '' })} dismissible>
                        {alert.message}
                    </Alert>
                )}
                <form>
                    <div className="mb-3">
                        <label htmlFor="questao" className="form-label">Questão</label>
                        <textarea
                            className="form-control"
                            id="questao"
                            name="questao"
                            rows="3"
                            value={form.questao}
                            onChange={handleChange}
                            placeholder="Digite o enunciado da questão"
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="banca" className="form-label">Banca</label>
                            <select
                                className="form-control"
                                id="banca"
                                name="banca"
                                value={form.banca}
                                onChange={handleChange}
                            >
                                <option value="">Selecione uma banca</option>
                                {bancas.map((b) => (
                                    <option key={b.banca_id} value={b.nome_banca}>{b.nome_banca}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="disciplina" className="form-label">Disciplina</label>
                            <select
                                className="form-control"
                                id="disciplina"
                                name="disciplina"
                                value={form.disciplina}
                                onChange={handleChange}
                            >
                                <option value="">Selecione uma disciplina</option>
                                {disciplinas.map((d) => (
                                    <option key={d.disciplina_id} value={d.nome_disciplina}>{d.nome_disciplina}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="cargo" className="form-label">Cargo</label>
                            <select
                                className="form-control"
                                id="cargo"
                                name="cargo"
                                value={form.cargo}
                                onChange={handleChange}
                            >
                                <option value="">Selecione um cargo</option>
                                {cargos.map((c) => (
                                    <option key={c.cargo_id} value={c.nome_cargo}>{c.nome_cargo}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="ano" className="form-label">Ano</label>
                            <input
                                type="number"
                                className="form-control"
                                id="ano"
                                name="ano"
                                value={form.ano}
                                onChange={handleChange}
                                placeholder="Digite o ano da questão"
                            />
                        </div>
                    </div>

                    {['A', 'B', 'C', 'D', 'E'].map((letra) => (
                        <div className="mb-3" key={letra}>
                            <label htmlFor={`alternativa${letra}`} className="form-label">Alternativa {letra}</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`alternativa${letra}`}
                                name={`alternativa${letra}`}
                                value={form[`alternativa${letra}`]}
                                onChange={handleChange}
                                placeholder={`Digite a alternativa ${letra}`}
                            />
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CadastroQuestoes;
