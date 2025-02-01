import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SidebarHome = ({ disciplinas, onDisciplinaSelect, disciplinaAtiva }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState('');

  const filteredDisciplinas = search
    ? disciplinas.filter((disciplina) =>
        disciplina.nome_disciplina?.toLowerCase().includes(search.toLowerCase())
      )
    : disciplinas;

<<<<<<< HEAD

=======
>>>>>>> 30bd1abaee91d5e60238d95607db431f6e098b76
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
        <div className="p-3" style={{ height: 'calc(100vh - 20px)', overflowY: 'auto' }}>
          <Form.Control
            type="text"
            placeholder="Pesquisar disciplina..."
            value={search}
            onChange={(e) => {
              console.log('Texto de busca:', e.target.value);
              setSearch(e.target.value);
            }}
            className="mb-3"
          />
          <hr />
          <ul className="list-unstyled">
            {filteredDisciplinas.map((disciplina) => {
              return (
                <li
                  key={disciplina.disciplina_id}
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
                  {disciplina.nome_disciplina}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarHome;
