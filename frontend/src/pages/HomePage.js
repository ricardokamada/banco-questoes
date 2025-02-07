import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarHome from '../components/SidebarHome';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const HomePage = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const [disciplinas, setDisciplinas] = useState([]);
    const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
    const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);
    const [questoes, setQuestoes] = useState([]);
    const [respostaStatus, setRespostaStatus] = useState({});
    const [respostasSelecionadas, setRespostasSelecionadas] = useState({});
    const [respostasCorretas, setRespostasCorretas] = useState({});
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
        if (!user) {
            navigate('/login');
            return;
        }

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

            if (!response.data.correta) {
                setRespostasCorretas((prevRespostas) => ({
                    ...prevRespostas,
                    [questaoId]: response.data.alternativa_correta,
                }));
            }
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
            <header className="d-flex justify-content-end align-items-center py-3 bg-white shadow-sm border-bottom px-4">
                <div className="d-flex gap-3 pe-4">
                    <button className="btn btn-outline-dark rounded-pill px-4" onClick={() => navigate('/')}>Home</button>
                    {!user && (
                        <button className="btn btn-outline-dark rounded-pill px-4" onClick={() => navigate('/cadastro')}>Cadastro</button>
                    )}
                    {user ? (
                        <button className="btn btn-danger rounded-pill px-4" onClick={logout}>Sair</button>
                    ) : (
                        <button className="btn btn-dark rounded-pill px-4" onClick={() => navigate('/login')}>Login</button>
                    )}
                </div>
            </header>

            <div className="d-flex">
                <SidebarHome disciplinas={disciplinas} onDisciplinaSelect={handleDisciplinaClick} disciplinaAtiva={disciplinaAtiva} />

                <div className="container py-5">
                    {!disciplinaAtiva ? (
                        <div>
                            <section className="bg-light p-5 rounded-4 shadow-sm mb-4">
                                <h2 className="display-6 text-center mb-4 fw-bold text-dark">Banco de Questões: Sua Preparação para Concursos de TI</h2>
                                <p className="lead text-center mb-4">Evolua sua carreira tech com questões atualizadas e de alta qualidade.</p>
                                <p className="text-muted mb-5">Prepare-se de forma inteligente e eficiente para concursos na área de tecnologia com nossa plataforma especializada. O Banco de Questões oferece um acervo criteriosamente selecionado de questões a partir de 2020, abrangendo as principais disciplinas do setor tech:</p>

                                <div className="row g-4 mb-5">
                                    {['Sistemas Linux', 'Bancos de Dados', 'Segurança da Informação', 'Programação'].map((item) => (
                                        <div className="col-md-3" key={item}>
                                            <div className="card h-100 border-0 shadow-sm">
                                                <div className="card-body text-center">
                                                    <h5 className="card-title fw-bold text-dark mb-0">{item}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h4 className="text-center mb-4 fw-bold text-dark">Diferenciais da nossa plataforma</h4>
                                <div className="row g-4 mb-5">
                                    {[
                                        'Questões categorizadas por disciplina',
                                        'Gerador de simulados personalizados',
                                        'Base constantemente atualizada',
                                        'Interface intuitiva e moderna',
                                        'Desenvolvida por especialistas'
                                    ].map((item) => (
                                        <div className="col-md-4" key={item}>
                                            <div className="card h-100 border-0 bg-white shadow-sm">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-dark rounded-circle p-2 me-3">✓</span>
                                                        <h6 className="mb-0 fw-bold">{item}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white rounded-4 p-5 shadow-sm mb-5">
                                    <h4 className="text-center mb-4 fw-bold text-dark">Invista em seu futuro profissional</h4>
                                    <div className="row justify-content-center g-4">
                                        <div className="col-md-5">
                                            <div className="card h-100 border-0 shadow-sm">
                                                <div className="card-body text-center p-4">
                                                    <h5 className="fw-bold mb-3">Acesso Trimestral</h5>
                                                    <h3 className="display-6 fw-bold text-dark mb-3">R$ 79,90</h3>
                                                    <button className="btn btn-dark rounded-pill px-4">Assinar agora</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="card h-100 border-dark shadow-sm">
                                                <div className="card-body text-center p-4">
                                                    <h5 className="fw-bold mb-3">Acesso Anual</h5>
                                                    <h3 className="display-6 fw-bold text-dark mb-3">R$ 130,00</h3>
                                                    <span className="badge bg-success mb-3">Melhor custo-benefício!</span>
                                                    <button className="btn btn-dark rounded-pill px-4">Assinar agora</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-center mt-4 text-muted">Aceitamos pagamentos via PIX e Bitcoin</p>
                                </div>

                                <footer className="text-center">
                                    <p className="fw-bold text-dark mb-2">Desenvolvido com excelência por Ricardo Kamada</p>
                                    <p className="text-muted">Profissional com ampla experiência no mercado de tecnologia</p>
                                </footer>

                                <div className="d-flex justify-content-center gap-3 mt-5">
                                    <button className="btn btn-dark btn-lg rounded-pill px-5">Comece Agora</button>
                                    <button className="btn btn-outline-dark btn-lg rounded-pill px-5">Saiba Mais</button>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div>
                            <h1 className="mb-4">Questões da disciplina: {disciplinaAtiva.nome_disciplina}</h1>
                            {questoes.length > 0 ? (
                                questoes.map((questao) => (
                                    <div
                                        key={questao.id}
                                        className={`questao mb-4 p-4 border rounded shadow-sm ${respostaStatus[questao.id] === 'correta'
                                            ? 'bg-success bg-opacity-10'
                                            : respostaStatus[questao.id] === 'incorreta'
                                                ? 'bg-danger bg-opacity-10'
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
                                                                checked={respostasSelecionadas[questao.id] === letra}
                                                                disabled={respostaStatus[questao.id]}
                                                            />
                                                            {`${letra.toUpperCase()}) ${questao[`alternativa_${letra}`]}`}
                                                        </label>
                                                    </li>
                                                )
                                            ))}
                                        </ul>

                                        <div className="text-start">
                                            <button className="btn btn-primary btn-sm" onClick={() => handleResponder(questao.id, alternativaSelecionada)} disabled={respostaStatus[questao.id]}>
                                                Responder
                                            </button>
                                            {respostaStatus[questao.id] === 'correta' && (
                                                <p className="text-success fw-bold mt-2">Parabéns! Você acertou!</p>
                                            )}
                                            {respostaStatus[questao.id] === 'incorreta' && (
                                                <p className="text-danger fw-bold mt-2">A alternativa correta é: {respostasCorretas[questao.id]}</p>
                                            )}
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
