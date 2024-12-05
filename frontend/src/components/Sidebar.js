import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const Sidebar = ({ disciplinas }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState('');

  // Filtrar disciplinas com base no valor do campo de pesquisa
  const filteredDisciplinas = disciplinas.filter((disciplina) =>
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
      {/* Botão para esconder/exibir a barra lateral */}
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
          {/* Campo de pesquisa */}
          <Form.Control
            type="text"
            placeholder="Pesquisar disciplina..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
          />

          {/* Linha para separar */}
          <hr />

          {/* Lista de disciplinas */}
          <ul className="list-unstyled">
            {filteredDisciplinas.map((disciplina, index) => (
              <li key={index} className="mb-2">
                <Link to={`#`} className="text-decoration-none">
                  {disciplina}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
