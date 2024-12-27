import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import api from '../services/api'; // Certifique-se de configurar sua instância da API

const CadastroQuestoes = () => {
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
        alternativaE: ''
    });

    const [bancas, setBancas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [modalInfo, setModalInfo] = useState({ show: false, success: false, message: '' });

    useEffect(() => {
        const fetchBancas = async () => {
            try {
                const response = await api.get('/bancas');
                setBancas(response.data.map((b) => b.nome_banca));
            } catch (error) {
                console.error('Erro ao buscar bancas:', error);
                alert('Erro ao carregar bancas. Verifique o backend.');
            }
        };

        const fetchDisciplinas = async () => {
            try {
                const response = await api.get('/disciplinas');
                setDisciplinas(response.data.map((d) => d.nome_disciplina));
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
                alert('Erro ao carregar disciplinas. Verifique o backend.');
            }
        };

        const fetchCargos = async () => {
            try {
                const response = await api.get('/cargos');
                setCargos(response.data.map((c) => c.nome_cargo));
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
        const payload = {
            questao: form.questao.trim(),
            banca_id: form.banca, // Certifique-se de que o valor seja o ID correto
            disciplina_id: form.disciplina, // Certifique-se de que o valor seja o ID correto
            cargo_id: form.cargo, // Certifique-se de que o valor seja o ID correto
            ano_prova: form.ano,
            alternativa_correta: 'A', // Atualize conforme a lógica de escolha da alternativa correta
            alternativa_a: form.alternativaA.trim(),
            alternativa_b: form.alternativaB.trim(),
            alternativa_c: form.alternativaC.trim(),
            alternativa_d: form.alternativaD.trim(),
            alternativa_e: form.alternativaE.trim(),
        };
    
        try {
            const response = await api.post('http://localhost:3000/api/questoes/', payload);
            setModalInfo({ show: true, success: true, message: 'Questão salva com sucesso!' });
        } catch (error) {
            console.error('Erro ao salvar questão:', error.response?.data || error.message);
            setModalInfo({ show: true, success: false, message: 'Erro ao salvar questão. Verifique os dados e tente novamente.' });
        }
    };
    

    const handleCloseModal = () => {
        setModalInfo({ show: false, success: false, message: '' });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3>Cadastro de Questões</h3>
                </div>
                <div className="card-body">
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
                                <input
                                    type="text"
                                    className="form-control"
                                    id="banca"
                                    name="banca"
                                    placeholder="Pesquisar banca..."
                                    value={form.banca}
                                    onChange={handleChange}
                                    list="bancas"
                                />
                                <datalist id="bancas">
                                    {bancas.map((banca, index) => (
                                        <option key={index} value={banca} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="disciplina" className="form-label">Disciplina</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="disciplina"
                                    name="disciplina"
                                    placeholder="Pesquisar disciplina..."
                                    value={form.disciplina}
                                    onChange={handleChange}
                                    list="disciplinas"
                                />
                                <datalist id="disciplinas">
                                    {disciplinas.map((disciplina, index) => (
                                        <option key={index} value={disciplina} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="cargo" className="form-label">Cargo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cargo"
                                    name="cargo"
                                    placeholder="Pesquisar cargo..."
                                    value={form.cargo}
                                    onChange={handleChange}
                                    list="cargos"
                                />
                                <datalist id="cargos">
                                    {cargos.map((cargo, index) => (
                                        <option key={index} value={cargo} />
                                    ))}
                                </datalist>
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

                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-primary me-2" onClick={handleSave}>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal show={modalInfo.show} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.success ? 'Sucesso' : 'Erro'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalInfo.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CadastroQuestoes;
