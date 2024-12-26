import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [searchBanca, setSearchBanca] = useState('');
    const [searchDisciplina, setSearchDisciplina] = useState('');
    const [searchCargo, setSearchCargo] = useState('');

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

    const handleSave = () => {
        console.log('Salvando questão:', form);
    };

    const handleEdit = () => {
        console.log('Editando questão:', form);
    };

    const filteredBancas = bancas.filter((banca) => banca.toLowerCase().includes(searchBanca.toLowerCase()));
    const filteredDisciplinas = disciplinas.filter((disciplina) => disciplina.toLowerCase().includes(searchDisciplina.toLowerCase()));
    const filteredCargos = cargos.filter((cargo) => cargo.toLowerCase().includes(searchCargo.toLowerCase()));

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
                                    value={searchBanca}
                                    onChange={(e) => setSearchBanca(e.target.value)}
                                />
                                <ul className="list-group mt-2">
                                    {filteredBancas.map((banca, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => {
                                                setForm({ ...form, banca });
                                                setSearchBanca('');
                                            }}
                                        >
                                            {banca}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="disciplina" className="form-label">Disciplina</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="disciplina"
                                    name="disciplina"
                                    placeholder="Pesquisar disciplina..."
                                    value={searchDisciplina}
                                    onChange={(e) => setSearchDisciplina(e.target.value)}
                                />
                                <ul className="list-group mt-2">
                                    {filteredDisciplinas.map((disciplina, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => {
                                                setForm({ ...form, disciplina });
                                                setSearchDisciplina('');
                                            }}
                                        >
                                            {disciplina}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="cargo" className="form-label">Cargo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cargo"
                                    name="cargo"
                                    placeholder="Pesquisar cargo..."
                                    value={searchCargo}
                                    onChange={(e) => setSearchCargo(e.target.value)}
                                />
                                <ul className="list-group mt-2">
                                    {filteredCargos.map((cargo, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => {
                                                setForm({ ...form, cargo });
                                                setSearchCargo('');
                                            }}
                                        >
                                            {cargo}
                                        </li>
                                    ))}
                                </ul>
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
                            <button type="button" className="btn btn-secondary" onClick={handleEdit}>Editar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CadastroQuestoes;
