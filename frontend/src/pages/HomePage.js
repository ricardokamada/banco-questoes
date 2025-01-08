import React, { useState, useEffect } from 'react';
import SidebarHome from '../components/SidebarHome';
import api from '../services/api';

const HomePage = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const response = await api.get('/disciplinas');
        console.log('Resposta da API:', response.data);
        if (response.data) {
          setDisciplinas(response.data.map((d) => d.nome_disciplina));
        }
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        alert('Erro ao carregar disciplinas. Verifique o backend.');
      } finally {
        setLoading(false); // Finaliza o carregamento
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
      <div className="container mt-4">
        {loading ? (
          <h1>Carregando disciplinas...</h1>
        ) : disciplinaAtiva ? (
          <h1>Conteúdo da disciplina: {disciplinaAtiva}</h1>
        ) : (
          <h1>Selecione uma disciplina no menu lateral.</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;
