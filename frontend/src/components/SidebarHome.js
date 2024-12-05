import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SidebarHome = ({ disciplinas }) => {
  const [collapsed, setCollapsed] = useState(false); // Controle de visibilidade
  const [search, setSearch] = useState(''); // Valor do campo de busca

  // Filtrar disciplinas com base na pesquisa
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
      className="bg-light vh-100 border-end position-relative"
    >
      {/* Botão para esconder/exibir a barra lateral */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '-40px',
          zIndex: 1000,
          transform: 'rotate(90deg)',
          background: 'none',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
      >
        {collapsed ? '>' : '<'}
      </button>

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

          {/* Linha separadora */}
          <hr />

          {/* Lista de disciplinas */}
          <ul className="list-unstyled">
            {filteredDisciplinas.map((disciplina, index) => (
              <li key={index} className="mb-2">
                <span>{disciplina}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarHome;
