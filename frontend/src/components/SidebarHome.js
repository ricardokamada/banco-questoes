import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SidebarHome = ({ disciplinas, onDisciplinaSelect, disciplinaAtiva }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState('');

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
              <li
                key={index}
                className={`mb-2 ${
                  disciplina === disciplinaAtiva ? 'bg-primary text-white' : ''
                }`}
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => onDisciplinaSelect(disciplina)}
              >
                {disciplina}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarHome;
