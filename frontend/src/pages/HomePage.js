import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarHome from '../components/SidebarHome';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const HomePage = () => {
    const { loading } = useContext(AuthContext);
    const [disciplinas, setDisciplinas] = useState([]); // Armazena as disciplinas do backend
    const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
    const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);
    const [questoes, setQuestoes] = useState([]);
    const navigate = useNavigate();

    // Busca as disciplinas do backend ao carregar a página
    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await api.get('/disciplinas');
                console.log('Disciplinas retornadas do backend:', response.data); // Verificar os dados recebidos
                setDisciplinas(response.data); // Atualiza o estado
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
            }
        };
        fetchDisciplinas();
    }, []);


    // Busca questões para a disciplina selecionada
    const fetchQuestoes = async (disciplinaId) => {
        try {
            console.log(`Buscando questões para disciplina ID: ${disciplinaId}`); // Log para depuração
            const response = await api.get(`/questoes/disciplina/${disciplinaId}`);
            console.log('Questões carregadas:', response.data.questoes); // Verificar dados recebidos
            setQuestoes(response.data.questoes);
        } catch (error) {
            console.error('Erro ao buscar questões:', error);
        }
    };


    // Lida com a seleção de uma disciplina no menu
    const handleDisciplinaClick = (disciplina) => {
        setDisciplinaAtiva(disciplina);
        setQuestoes([]); // Limpa as questões antes de buscar novas
        fetchQuestoes(disciplina.disciplina_id); // Usa o ID correto da disciplina
    };

    // Verificação da reposta
    const handleResponder = async (questaoId, alternativaSelecionada) => {
        try {
            const response = await api.post('/questoes/verificar-resposta', {
                questaoId,
                alternativaSelecionada,
            });
    
            if (response.data.correta) {
                alert(response.data.mensagem); // Exibe mensagem de sucesso
            } else {
                alert(response.data.mensagem); // Exibe mensagem de erro
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
            <header className="d-flex justify-content-end py-1 bg-light border-bottom">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/')}
                >
                    Home
                </button>
                <button
                    className="btn btn-outline-primary btn-sm me-1"
                    onClick={() => navigate('/cadastro')}
                >
                    Cadastro
                </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </header>

            <div className="d-flex">
                {/* Passa as disciplinas recebidas do backend para o Sidebar */}
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
                                    <div key={questao.id} className="questao mb-4 p-4 border rounded shadow-sm bg-light">
                                        {/* Informações no topo */}
                                        <div className="mb-3">
                                            <p className="text-muted mb-1">
                                                <strong>questao_id:</strong> {questao.id}   |
                                                <strong>Ano:</strong> {questao.ano}     |
                                                <strong> Banca:</strong> {questao.banca}    |
                                                <strong> Disciplina:</strong> {questao.disciplina}  |
                                                <strong> Cargo:</strong> {questao.cargo}
                                            </p>
                                        </div>

                                        {/* Conteúdo da questão */}
                                        <div className="mb-3">
                                            <h5>{questao.questao}</h5>
                                        </div>

                                        {/* Alternativas */}
                                        <ul className="list-group mb-3">
                                            {['a', 'b', 'c', 'd', 'e'].map((letra) => (
                                                questao[`alternativa_${letra}`] && (
                                                    <li key={letra} className="list-group-item">
                                                        <label className="d-flex align-items-center">
                                                            <input
                                                                type="radio"
                                                                name={`questao_${questao.id}`} // Grupo de alternativas para cada questão
                                                                value={letra}
                                                                className="form-check-input me-2"
                                                                onChange={() => setAlternativaSelecionada(letra)} // Atualiza a alternativa selecionada
                                                            />
                                                            {`${letra.toUpperCase()}) ${questao[`alternativa_${letra}`]}`}
                                                        </label>
                                                    </li>
                                                )
                                            ))}

                                        </ul>

                                        {/* Botão para responder */}
                                        <div className="text-end">
                                        <button
    className="btn btn-primary w-100"
    onClick={() => handleResponder(questao.id, alternativaSelecionada)} // Passa a alternativa selecionada
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
