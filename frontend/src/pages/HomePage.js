import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarHome from '../components/SidebarHome';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const HomePage = () => {
    const { loading } = useContext(AuthContext);
    const [disciplinas, setDisciplinas] = useState([]);
    const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
    const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);
    const [questoes, setQuestoes] = useState([]);
    const [respostaStatus, setRespostaStatus] = useState({}); // Armazena o status da resposta (correta/incorreta)
    const [respostasSelecionadas, setRespostasSelecionadas] = useState({}); // Armazena a alternativa selecionada para cada questão
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await api.get('/disciplinas');
                setDisciplinas(response.data);
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
            }
        };
        fetchDisciplinas();
    }, []);

    const fetchQuestoes = async (disciplinaId) => {
        try {
            const response = await api.get(`/questoes/disciplina/${disciplinaId}`);
            setQuestoes(response.data.questoes);
        } catch (error) {
            console.error('Erro ao buscar questões:', error);
        }
    };

    const handleDisciplinaClick = (disciplina) => {
        setDisciplinaAtiva(disciplina);
        setQuestoes([]);
        fetchQuestoes(disciplina.disciplina_id);
    };

    const handleResponder = async (questaoId, alternativaSelecionada) => {
        try {
            const response = await api.post('/questoes/verificar-resposta', {
                questaoId,
                alternativaSelecionada,
            });

            setRespostaStatus((prevStatus) => ({
                ...prevStatus,
                [questaoId]: response.data.correta ? 'correta' : 'incorreta',
            }));

            setRespostasSelecionadas((prevRespostas) => ({
                ...prevRespostas,
                [questaoId]: alternativaSelecionada,
            }));

        } catch (error) {
            console.error('Erro ao verificar a resposta:', error);
            alert('Ocorreu um erro ao verificar a resposta. Tente novamente.');
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <header className="d-flex justify-content-end py-1 bg-light border-bottom">
                <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
                    Home
                </button>
                <button className="btn btn-outline-primary btn-sm me-1" onClick={() => navigate('/cadastro')}>
                    Cadastro
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>
                    Login
                </button>
            </header>

            <div className="d-flex">
                <SidebarHome
                    disciplinas={disciplinas}
                    onDisciplinaSelect={handleDisciplinaClick}
                    disciplinaAtiva={disciplinaAtiva}
                />

                <div className="container mt-4">
                    {!disciplinaAtiva ? (
                        <div className="bg-light p-4 rounded shadow-sm mb-4">
                            <h2 className="text-center mb-3">Bem-vindo(a) à Plataforma Banco de Questões!</h2>
                            <p className="text-muted">
                                Estamos entusiasmados em tê-lo(a) conosco nesta jornada de aprendizado e preparação. Aqui, você terá acesso a uma ampla variedade de questões cuidadosamente selecionadas para impulsionar seus estudos e ampliar seus conhecimentos.
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="mb-4">Questões da disciplina: {disciplinaAtiva.nome_disciplina}</h1>
                            {questoes.length > 0 ? (
                                questoes.map((questao) => (
                                    <div
                                        key={questao.id}
                                        className={`questao mb-4 p-4 border rounded shadow-sm ${
                                            respostaStatus[questao.id] === 'correta'
                                                ? 'bg-success bg-opacity-10' // Verde bem claro
                                                : respostaStatus[questao.id] === 'incorreta'
                                                ? 'bg-danger bg-opacity-10' // Vermelho bem claro
                                                : 'bg-light'
                                        }`}
                                    >
                                        <div className="mb-3">
                                            <p className="mb-1">
                                                <strong>questao_id:</strong> {questao.id} | <strong>Ano:</strong> {questao.ano} | <strong>Banca:</strong> {questao.banca} | <strong>Disciplina:</strong> {questao.disciplina} | <strong>Cargo:</strong> {questao.cargo}
                                            </p>
                                        </div>

                                        <div className="mb-3">
                                            <h5>{questao.questao}</h5>
                                        </div>

                                        <ul className="list-group mb-3">
                                            {['a', 'b', 'c', 'd', 'e'].map((letra) => (
                                                questao[`alternativa_${letra}`] && (
                                                    <li key={letra} className="list-group-item">
                                                        <label className="d-flex align-items-center">
                                                            <input
                                                                type="radio"
                                                                name={`questao_${questao.id}`}
                                                                value={letra}
                                                                className="form-check-input me-2"
                                                                onChange={() => setAlternativaSelecionada(letra)}
                                                                checked={respostasSelecionadas[questao.id] === letra} // Mantém a alternativa selecionada marcada
                                                                disabled={respostaStatus[questao.id]} // Desabilita após responder
                                                            />
                                                            {`${letra.toUpperCase()}) ${questao[`alternativa_${letra}`]}`}
                                                        </label>
                                                    </li>
                                                )
                                            ))}
                                        </ul>

                                        <div className="text-start">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleResponder(questao.id, alternativaSelecionada)}
                                                disabled={respostaStatus[questao.id]} // Desabilita após responder
                                            >
                                                Responder
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma questão encontrada para essa disciplina.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;