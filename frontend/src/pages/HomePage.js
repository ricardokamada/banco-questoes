import React, { useState, useEffect, useContext } from 'react';
import SidebarHome from '../components/SidebarHome';
import api from '../services/api';

const HomePage = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await api.get('/disciplinas');
        setDisciplinas(response.data.map((d) => d.nome_disciplina));
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchDisciplinas();
  }, []);

  return (
    <div className="d-flex">
      <SidebarHome
        disciplinas={disciplinas}
        onDisciplinaSelect={setDisciplinaAtiva}
        disciplinaAtiva={disciplinaAtiva}
      />
      <div className="container mt-4 d-flex flex-column align-items-center">
        {disciplinaAtiva ? (
          <>
            <h1 className="mb-4 text-center">Disciplina: {disciplinaAtiva}</h1>
            <p>Conteúdo dinâmico da disciplina <strong>{disciplinaAtiva}</strong>.</p>
          </>
        ) : (
          <h1 className="text-center">Selecione uma disciplina no menu lateral.</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;
