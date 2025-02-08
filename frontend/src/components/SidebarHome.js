import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa'; // Importando ícones
import '../styles/SidebarHome.css'

const SidebarHome = ({ disciplinas, onDisciplinaSelect, disciplinaAtiva }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [search, setSearch] = useState('');

    const filteredDisciplinas = search
        ? disciplinas.filter((disciplina) =>
            disciplina.nome_disciplina?.toLowerCase().includes(search.toLowerCase())
        )
        : disciplinas;

    return (
        <div
            style={{
                width: collapsed ? '60px' : '250px',
                overflow: 'hidden',
                transition: 'width 0.3s, background-color 0.3s',
                background: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '2px 0 12px rgba(0, 0, 0, 0.1)',
                borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                position: 'fixed',
                zIndex: 1050,
                height: '100vh'
            }}
            className="vh-100 sidebar-responsive"
        >

<button
    onClick={() => setCollapsed(!collapsed)}
    className="toggle-sidebar"
>
    {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
</button>


            {!collapsed && (
                <div className="p-4 custom-scrollbar" style={{ height: '100vh', overflowY: 'auto' }}>

                    <div className="d-flex align-items-center mb-4">
                        <FaSearch className="me-2 text-muted" />
                        <Form.Control
                            type="text"
                            placeholder="Pesquisar disciplina..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-0 shadow-none"
                            style={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                backdropFilter: 'blur(5px)',
                            }}
                        />
                    </div>
                    <hr />

                    <ul className="list-unstyled">
                        {filteredDisciplinas.map((disciplina) => (
                            <li
                                key={disciplina.disciplina_id}
                                className="mb-2 d-flex align-items-center p-2 rounded"
                                style={{
                                    cursor: 'pointer',
                                    background: disciplina === disciplinaAtiva ? 'rgba(200, 200, 200, 0.5)' : 'transparent', // Cinza claro suave
                                    color: disciplina === disciplinaAtiva ? '#333' : '#000', // Texto um pouco mais escuro
                                    border: disciplina === disciplinaAtiva ? '1px solid rgba(150, 150, 150, 0.5)' : 'none', // Borda cinza sutil
                                    transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out',
                                }}
                                onClick={() => onDisciplinaSelect(disciplina)}
                            >
                                <span>{disciplina.nome_disciplina}</span>
                            </li>



                            //   <li
                            //     key={disciplina.disciplina_id}
                            //     className={`mb-2 d-flex align-items-center p-2 rounded ${
                            //       disciplina === disciplinaAtiva
                            //         ? 'bg-primary text-white'
                            //         : 'text-dark'
                            //     }`}
                            //     style={{
                            //       cursor: 'pointer',
                            //       transition: 'background-color 0.2s, color 0.2s',
                            //     }}
                            //     onClick={() => onDisciplinaSelect(disciplina)}
                            //   >
                            //     {/* Opcional: Adicione um ícone aqui */}
                            //     <span>{disciplina.nome_disciplina}</span>
                            //   </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SidebarHome;