import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SidebarHome from '../components/SidebarHome';
import api from '../services/api';

const HomePage = () => {
    const [questoes, setQuestoes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [respostas, setRespostas] = useState({}); // Armazena as respostas selecionadas
    const [resultados, setResultados] = useState({}); // Armazena os resultados (correto/errado)
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Carregar questões ao montar o componente
    useEffect(() => {
        const fetchQuestoes = async () => {
            try {
                const response = await api.get('/questoes');
                setQuestoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar questões:', error);
            }
        };

        fetchQuestoes();
    }, []);

    // Carregar disciplinas ao montar o componente
    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await api.get('/disciplinas');
                setDisciplinas(response.data.map((d) => d.nome_disciplina));
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
            }
        };

        fetchDisciplinas();
    }, []);

    // Lidar com a seleção de uma resposta
    const handleResposta = (idQuestao, alternativa) => {
        setRespostas((prevRespostas) => ({
            ...prevRespostas,
            [idQuestao]: alternativa,
        }));
    };

    // Verificar resposta ao clicar em "Responder"
    const handleResponder = async (idQuestao) => {
        const resposta = respostas[idQuestao];
        if (!resposta) {
            alert('Por favor, selecione uma alternativa.');
            return;
        }

        console.log('Enviando para o backend:', { idQuestao, resposta });

        try {
            const response = await api.post(`/questoes/verificar`, {
                idQuestao,
                resposta,
            });

            console.log('Resposta do backend:', response.data);

            // Atualizar resultados com base na resposta correta
            setResultados((prevResultados) => ({
                ...prevResultados,
                [idQuestao]: response.data.correto, // Certifique-se de usar o mesmo ID da questão
            }));
        } catch (error) {
            console.error('Erro ao verificar resposta:', error);
            alert('Erro ao verificar a resposta.');
        }
    };



    return (
        <div className="d-flex">
            <SidebarHome disciplinas={disciplinas} />
            <div className="container mt-4 d-flex flex-column align-items-center">
                <h1 className="mb-4 text-center">Lista de Questões</h1>
                {questoes.length === 0 ? (
                    <p>Carregando questões...</p>
                ) : (
                    <ul className="list-group w-100" style={{ maxWidth: '800px' }}>
                        {questoes.map((questao) => (
                            <li
                                key={questao.id}
                                className={`list-group-item mb-4 p-4 text-center ${resultados[questao.id] === true
                                    ? 'border border-success'
                                    : resultados[questao.id] === false
                                        ? 'border border-danger'
                                        : ''
                                    }`}
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <h5 className="mb-4">{questao.enunciado}</h5>
                                {questao.alternativas.map((alternativa, altIndex) => (
                                    <div
                                        key={altIndex}
                                        className="form-check d-flex justify-content-center align-items-center"
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <input
                                            className="form-check-input me-2"
                                            type="radio"
                                            name={`questao-${questao.id}`}
                                            id={`questao-${questao.id}-alt-${altIndex}`}
                                            value={alternativa}
                                            onChange={() => handleResposta(questao.id, alternativa)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`questao-${questao.id}-alt-${altIndex}`}
                                        >
                                            {alternativa}
                                        </label>
                                    </div>
                                ))}
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={() => handleResponder(questao.id)}
                                >
                                    Responder
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
    
};

export default HomePage;
