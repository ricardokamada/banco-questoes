// src/pages/HomePage.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarHome from '../../components/layout/SidebarHome';
import HomeHeader from '../../components/layout/HomeHeader';
import HomeContent from '../../pages/HomePage/HomeContent';
import QuestoesList from '../../pages/Questoes/QuestoesList';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const HomePage = () => {
    const { user, loading } = useContext(AuthContext);
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);
    const [questoes, setQuestoes] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/disciplinas')
            .then((response) => setDisciplinas(response.data || []))
            .catch((error) => console.error('Erro ao buscar disciplinas:', error));
    }, []);

    // 🔹 Função para buscar questões da disciplina selecionada
    const fetchQuestoes = async (disciplinaId, page = 1) => {
        try {
            const response = await api.get(`/questoes/disciplina/${disciplinaId}?page=${page}&limit=12`);
            setQuestoes(response.data.questoes || []);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar questões:', error);
            setQuestoes([]);
        }
    };

    // 🔹 Atualiza a disciplina ativa e busca as questões
    const handleDisciplinaSelect = (disciplina) => {
        setDisciplinaAtiva(disciplina);
        setQuestoes([]); // Limpa as questões antes de buscar
        fetchQuestoes(disciplina.disciplina_id, 1); // Busca as questões da disciplina selecionada
    };

    return (
        <div>
            <HomeHeader />
            <div className="d-flex flex-column flex-md-row">
                <SidebarHome disciplinas={disciplinas} onDisciplinaSelect={handleDisciplinaSelect} disciplinaAtiva={disciplinaAtiva} />
                <div className="container pt-1">
                    {!disciplinaAtiva ? (
                        <HomeContent />
                    ) : (
                        <QuestoesList 
                            disciplinaAtiva={disciplinaAtiva} 
                            questoes={questoes} 
                            fetchQuestoes={fetchQuestoes} 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            user={user} 
                            navigate={navigate} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
