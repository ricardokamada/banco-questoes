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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
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

    const fetchQuestoes = async (disciplinaId, page = 1) => {
        try {
            const response = await api.get(`/questoes/disciplina/${disciplinaId}?page=${page}&limit=12`);
            setQuestoes(response.data.questoes);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar questões:', error);
        }
    };

    const handleDisciplinaClick = (disciplina) => {
        setDisciplinaAtiva(disciplina);
        setQuestoes([]);
        fetchQuestoes(disciplina.disciplina_id, 1); // Sempre inicia na primeira página
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
            <header className="d-flex flex-column flex-md-row justify-content-end align-items-center py-2 bg-white shadow-sm border-bottom px-2">
                <div className="d-flex gap-3 pe-4">
                    <button className="btn btn-outline-dark rounded-pill px-3" onClick={() => navigate('/')}>Home</button>
                    {!user && (
                        <button className="btn btn-outline-dark rounded-pill px-3" onClick={() => navigate('/cadastro')}>Cadastro</button>
                    )}
                    {user ? (
                        <button className="btn btn-danger rounded-pill px-3" onClick={logout}>Sair</button>
                    ) : (
                        <button className="btn btn-dark rounded-pill px-3" onClick={() => navigate('/login')}>Login</button>
                    )}
                </div>
            </header>

            <div className="d-flex flex-column flex-md-row">

                <SidebarHome disciplinas={disciplinas} onDisciplinaSelect={handleDisciplinaClick} disciplinaAtiva={disciplinaAtiva} />

                <div className="container pt-1">
                    {!disciplinaAtiva ? (
                        <div>
                            <section className="bg-light p-5 rounded-4 shadow-sm mb-4">
                                <h2 className="display-6 text-center mb-4 fw-bold text-dark">
                                    Navegue pelo Conhecimento com o Banco de Questões Definitivo
                                </h2>

                                <p className="lead text-center mb-4">Aprimore seus conhecimentos em tecnologia com perguntas atualizadas e de excelência.</p>
                                <p className="text-muted mb-5">Prepare-se de forma inteligente e eficiente para concursos na área de tecnologia com a plataforma especializada. O Banco de Questões oferece um acervo criteriosamente selecionado de questões a partir de 2020, abrangendo as principais disciplinas do setor tecnologia:</p>

                                <div className="row g-4 mb-5">
                                    {['Linux', 'Bancos de Dados', 'Segurança da Informação', 'Programação', 'Testes de Software', 'Metodologia Agil', 'Redes de computadores', 'E muito mais ...'].map((item) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={item}>
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
                                    <h4 className="text-center mb-3 fw-bold text-danger">Knowledge is Power</h4>

                                    <div className="d-flex justify-content-between align-items-center bg-light-subtle text-dark px-4 py-3 rounded-4 shadow">
                                        {/* Texto alinhado à esquerda com fundo preto */}
                                        <div className="text-start">
                                            <h5 className="fw-bold mb-2 text-danger">Take the Red Pill</h5>
                                            <p className="mb-0">Desperte seu verdadeiro potencial e junte-se aos melhores.</p>
                                        </div>

                                        {/* Imagem Bitcoin à direita */}
                                        <div>
                                            <img src="accepted_here.png" alt="Bitcoin Accepted Here" className="img-fluid" style={{ maxWidth: '200px' }} />
                                        </div>
                                    </div>
                                </div>




                                <footer className="text-center">
                                    <p className="fw-bold text-dark mb-2">Desenvolvido com dedicação por Ricardo Kamada ***2025</p>
                                </footer>

                            </section>
                        </div>
                    ) : (
                        <div>
                            <h1 className="mb-4">Questões da disciplina: {disciplinaAtiva.nome_disciplina}</h1>
                            {questoes.length > 0 ? (
                                <>
                                    {questoes.map((questao) => (
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
                                    ))}

                                    {/* 🔹 Adicione este bloco aqui para a paginação */}
                                    <div className="pagination d-flex justify-content-center align-items-center mt-3">
                                        <button
                                            className="btn btn-outline-primary me-2"
                                            onClick={() => fetchQuestoes(disciplinaAtiva.disciplina_id, currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Anterior
                                        </button>

                                        <span className="mx-3">Página {currentPage} de {totalPages}</span>

                                        <button
                                            className="btn btn-outline-primary ms-2"
                                            onClick={() => fetchQuestoes(disciplinaAtiva.disciplina_id, currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Próxima
                                        </button>
                                    </div>
                                    {/* 🔹 Fim da paginação */}

                                </>
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
