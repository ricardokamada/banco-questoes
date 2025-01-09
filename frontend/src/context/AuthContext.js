import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Novo estado para indicar carregamento

  console.log("AuthProvider inicializado. User:", user);

  // Restaurar o usuário a partir do token no localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = JSON.parse(atob(token.split('.')[1])); // Decodifica o token JWT
        const isTokenExpired = decodedUser.exp * 1000 < Date.now();
        if (isTokenExpired) {
          console.error("Token expirado");
          logout();
        } else {
          setUser(decodedUser);
          api.defaults.headers.Authorization = `Bearer ${token}`; // Define o cabeçalho global
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        logout();
      }
    }
    setLoading(false); // Finaliza o carregamento
  }, []);

  // Função para login
  const login = async (email, senha) => {
    const response = await api.post('/login', { email, senha });
    const { token } = response.data;

    localStorage.setItem('token', token);

    const user = JSON.parse(atob(token.split('.')[1]));
    setUser(user); // Atualiza o estado do usuário no contexto

    api.defaults.headers.Authorization = `Bearer ${token}`; // Define o cabeçalho global
  };

  // Função para logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;