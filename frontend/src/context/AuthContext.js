import React, { createContext, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função para login
  const login = async (email, senha) => {
    const response = await api.post('/login', { email, senha });
    const { token } = response.data;

    localStorage.setItem('token', token);

    const user = JSON.parse(atob(token.split('.')[1]));
    setUser(user); // Atualiza o estado do usuário no contexto
  };

  // Função para logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

