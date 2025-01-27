import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarHome from '../components/SidebarHome';

const HomePage = () => {
    const disciplinas = [
        'Banco de dados',
        'SQL',
        'PL/SQL',
        'ORACLE APEX',
        'TESTE DE SOFTWARE',
        'PYTHON',
        'JAVASCRIPT',
        'C++',
        'C',
        'C#',
        'PHP',
        'ITIL',
        'COBIT',
        'KAMBAN',
        'LINUX',
        'WINDOWS',
    ];

    const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);
    const navigate = useNavigate();

    return (
        <div>
            <header className="d-flex justify-content-end py-1 bg-light border-bottom">


                <button
                    className="btn btn-outline-primary btn-sm me-1"
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
                <SidebarHome
                    disciplinas={disciplinas}
                    onDisciplinaSelect={setDisciplinaAtiva}
                    disciplinaAtiva={disciplinaAtiva}
                />
                <div className="container mt-4">
                    {/* Texto de boas-vindas */}
                    <div className="bg-light p-4 rounded shadow-sm mb-4">
                        <h2 className="text-center mb-3">Bem-vindo(a) à Plataforma Banco de Questões!</h2>
                        <p className="text-muted">
                            Estamos entusiasmados em tê-lo(a) conosco nesta jornada de aprendizado e preparação. Aqui, você terá acesso a uma ampla variedade de questões cuidadosamente selecionadas para impulsionar seus estudos e ampliar seus conhecimentos.
                        </p>
                        <h4 className="text-primary">🌟 Questões para Todos os Níveis</h4>
                        <p className="mb-3">
                            Explore questões de <strong>SQL</strong>, <strong>Redes de Computadores</strong> e <strong>Sistemas Operacionais</strong>, entre outras áreas fundamentais para sua formação.
                        </p>
                        <h4 className="text-primary">💼 Acesso Premium</h4>
                        <p className="mb-3">
                            Desbloqueie conteúdos exclusivos ao assinar o plano Premium por apenas <strong>R$ 99,00</strong>. Disciplinas como <strong>Banco de Dados</strong>, <strong>Programação</strong>, <strong>Linux</strong> e outras áreas de tecnologia estão à sua disposição para levar seus estudos ao próximo nível.
                        </p>
                        <h4 className="text-primary">💰 Desconto Exclusivo com Criptomoedas</h4>
                        <p>
                            Pague com <strong>Bitcoin (BTC)</strong>, <strong>BNB</strong> ou <strong>USDT</strong> e aproveite <strong>20% de desconto</strong> no valor do plano Premium. Economize enquanto investe no seu futuro!
                        </p>

                        {/* Linha de separação */}
                        <hr className="my-4" />

                        {/* QR Code Section */}
                        <div className="d-flex align-items-center mt-4">
                            {/* QR Code */}
                            <div className="me-4">
                                <img
                                    src="/qrcode_pix.jpg"
                                    alt="QR Code para pagamentos via Pix"
                                    className="img-fluid"
                                    style={{ maxWidth: '200px', border: '1px solid #ccc', borderRadius: '8px' }}
                                />
                            </div>

                            {/* Informações ao lado do QR Code */}
                            <div>
                                <h5 className="text-primary">Deseja fazer uma doação ou pagamento?</h5>
                                <p>
                                    Caso prefira, você pode realizar o pagamento diretamente via <strong>Pix</strong> utilizando o QR Code ao lado. Sua contribuição é muito importante para que possamos continuar oferecendo conteúdos de qualidade e expandindo nossa plataforma!
                                </p>
                                {/* Logos Pix e Bitcoin */}
                                <img
                                    src="/Logo-powered_by_Banco_Central.png"
                                    alt="Powered by Banco Central - Pix"
                                    className="img-fluid mt-2"
                                    style={{ maxWidth: '80px' }}
                                />

                            </div>
                        </div>
                    </div>

                    {/* Conteúdo da Página */}
                    {disciplinaAtiva ? (
                        <h1>Conteúdo da disciplina: {disciplinaAtiva}</h1>
                    ) : (
                        <h1>Selecione uma disciplina no menu lateral.</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
