import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Substitua pela URL do backend se estiver em produção
});


export default api;


