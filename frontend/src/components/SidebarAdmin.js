import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const Sidebar = ({ disciplinas, onQuestaoClick }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [search, setSearch] = useState('');

    const filteredDisciplinas = (disciplinas || []).filter((disciplina) =>
        disciplina.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            style={{
                width: collapsed ? '0' : '250px',
                overflow: 'hidden',
                transition: 'width 0.3s',
            }}
            className="bg-light vh-100 border-end"
        >
            <Button
                variant="link"
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '-40px',
                    zIndex: 1000,
                    transform: 'rotate(90deg)',
                    textDecoration: 'none',
                }}
            >
                {collapsed ? '>' : '<'}
            </Button>

            {!collapsed && (
                <div className="p-3">
                    <Form.Control
                        type="text"
                        placeholder="Pesquisar disciplina..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-3"
                    />
                    <hr />
                    <ul className="list-unstyled">
                        {filteredDisciplinas.map((disciplina, index) => (
                            <li key={index} className="mb-2">
                                <Link to={`#`} className="text-decoration-none">
                                    {disciplina}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <Button
                        className="w-100 mb-2"
                        variant="primary"
                        onClick={onQuestaoClick}
                    >
                        Questões
                    </Button>

                    <Button className="w-100 mb-2" variant="primary">
                        Usuários
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
