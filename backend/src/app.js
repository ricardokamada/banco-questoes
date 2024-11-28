const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

// Configuração do CORS
const corsOptions = {
    origin: 'http://localhost:3001', // Permite o frontend acessar o backend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite envio de cookies, se necessário
};
app.use(cors(corsOptions));

// Middleware para processar JSON
app.use(bodyParser.json());

// Middleware para log de requisições
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path} - Body:`, req.body);
    next();
});

// Rotas principais
app.use('/api', router);

module.exports = app;




