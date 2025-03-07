const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

// Configuração do CORS
const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:5000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware para processar JSON em todas as requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Para suportar form-urlencoded

// Middleware para log de requisições
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path} - Body:`, req.body || 'N/A');
    next();
});

// Rotas principais
app.use('/api', router);

module.exports = app;