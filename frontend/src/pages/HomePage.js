import React, { useState } from 'react';
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

  return (
    <div className="d-flex">
      <SidebarHome
        disciplinas={disciplinas}
        onDisciplinaSelect={setDisciplinaAtiva}
        disciplinaAtiva={disciplinaAtiva}
      />
      <div className="container mt-4">
        {disciplinaAtiva ? (
          <h1>Conteúdo da disciplina: {disciplinaAtiva}</h1>
        ) : (
          <h1>Selecione uma disciplina no menu lateral.</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;
