// src/components/QuestoesList.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const QuestoesList = ({ questoes, disciplinaAtiva, fetchQuestoes, currentPage, totalPages, user, navigate }) => {
    const [respostaStatus, setRespostaStatus] = useState({});
    const [respostasSelecionadas, setRespostasSelecionadas] = useState({});
    const [respostasCorretas, setRespostasCorretas] = useState({});
    const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);

    // 🔹 Busca questões sempre que a disciplina mudar
    useEffect(() => {
        if (disciplinaAtiva) {
            fetchQuestoes(disciplinaAtiva.disciplina_id, 1);
        }
    }, [disciplinaAtiva]);

    const handleResponder = async (questaoId, alternativa) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const response = await api.post('/questoes/verificar-resposta', {
                questaoId,
                alternativaSelecionada: alternativa,
            });

            setRespostaStatus((prevStatus) => ({
                ...prevStatus,
                [questaoId]: response.data.correta ? 'correta' : 'incorreta',
            }));

            setRespostasSelecionadas((prevRespostas) => ({
                ...prevRespostas,
                [questaoId]: alternativa,
            }));

            if (!response.data.correta) {
                setRespostasCorretas((prevRespostas) => ({
                    ...prevRespostas,
                    [questaoId]: response.data.alternativa_correta,
                }));
            }
        } catch (error) {
            console.error('Erro ao verificar a resposta:', error);
        }
    };

    return (
        <div>
            <h1 className="mb-4">Questões da disciplina: {disciplinaAtiva?.nome_disciplina}</h1>
            {questoes.length > 0 ? (
                <>
                    {questoes.map((questao) => (
                        <div
                            key={questao.id}
                            className={`questao mb-4 p-4 border rounded shadow-sm ${
                                respostaStatus[questao.id] === 'correta'
                                    ? 'bg-success bg-opacity-10'
                                    : respostaStatus[questao.id] === 'incorreta'
                                    ? 'bg-danger bg-opacity-10'
                                    : 'bg-light'
                            }`}
                        >
                            <div className="mb-3">
                                <p className="mb-1">
                                    <strong>questao_id:</strong> {questao.id} | <strong>Ano:</strong> {questao.ano} |{' '}
                                    <strong>Banca:</strong> {questao.banca} | <strong>Disciplina:</strong> {questao.disciplina} |{' '}
                                    <strong>Cargo:</strong> {questao.cargo}
                                </p>
                            </div>

                            <div className="mb-3">
                                <h5>{questao.questao}</h5>
                            </div>

                            <ul className="list-group mb-3">
                                {['a', 'b', 'c', 'd', 'e'].map(
                                    (letra) =>
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
                                )}
                            </ul>

                            <div className="text-start">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleResponder(questao.id, alternativaSelecionada)}
                                    disabled={respostaStatus[questao.id]}
                                >
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

                    {/* Paginação */}
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
                </>
            ) : (
                <p>Nenhuma questão encontrada para essa disciplina.</p>
            )}
        </div>
    );
};

export default QuestoesList;
