import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'; // Página de login
import AdminPage from './pages/AdminPage/AdminPage'; // Painel administrativo
import AuthProvider from './context/AuthContext'; // Importa o AuthProvider
import HomePage from './pages/HomePage/HomePage';
import UserRegistrationForm from './pages/UserRegistration/UserRegistrationForm';
import CheckoutPage from './pages/Pagamentos/CheckoutPage';
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Rota para a página inicial */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* Rota para a página de login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rota para o painel administrativo e suas rotas internas */}
                    <Route path="/admin/*" element={<AdminPage />} />

                    {/* Rota para o formulário de cadastro */}
                    <Route path="/cadastro" element={<UserRegistrationForm />} />

                    {/* Rota para pagamento pix */}
                    <Route path="/checkout" element={<CheckoutPage />} />


                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
