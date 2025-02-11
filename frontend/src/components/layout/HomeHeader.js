// src/components/layout/HomeHeader.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const HomeHeader = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <header className="d-flex flex-column flex-md-row justify-content-end align-items-center py-2 bg-white shadow-sm border-bottom px-2">
            <div className="d-flex gap-3 pe-4">
                <button className="btn btn-outline-dark rounded-pill px-3" onClick={() => navigate('/')}>Home</button>
                {!user && (
                    <button className="btn btn-outline-dark rounded-pill px-3" onClick={() => navigate('/cadastro')}>Cadastro</button>
                )}
                {user ? (
                    <button className="btn btn-danger rounded-pill px-3" onClick={logout}>Sair</button>
                ) : (
                    <button className="btn btn-dark rounded-pill px-3" onClick={() => navigate('/login')}>Login</button>
                )}
            </div>
        </header>
    );
};

export default HomeHeader;
