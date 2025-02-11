// src/components/HomeContent.js
import React from 'react';

const HomeContent = () => {
    return (
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
                                                        <span className="badge bg-dark rounded-circle p-2 me-3">?</span>
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
    );
};

export default HomeContent;
