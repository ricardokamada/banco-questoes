import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Página de login
import AdminPage from './pages/AdminPage'; // Painel administrativo
import AuthProvider from './context/AuthContext'; // Importa o AuthProvider
import HomePage from './pages/HomePage';
import UserRegistrationForm from './pages/UserRegistrationForm';
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Rota para a página de login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rota para o painel administrativo e suas rotas internas */}
                    <Route path="/admin/*" element={<AdminPage />} />

                    {/* Rota para o formulário de cadastro */}
                    <Route path="/cadastro" element={<UserRegistrationForm />} />

                    {/* Rota para a página inicial */}
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
