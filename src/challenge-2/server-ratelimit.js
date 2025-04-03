const express = require('express');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

const app = express();
const port = 8080;
const hostname = `http://localhost:${port}`;

// Middleware de rate limiting (Limite de 5 requisições por minuto)
const limiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minuto
    max: 100,  // Limite de 100 requisições
    message: 'Você excedeu o limite de requisições, tente novamente mais tarde.',
});

// Aplica o rate limiter para todas as rotas
app.use(limiter);

// Função simulando chamada externa
async function externalService() {
    return 'Resposta da chamada externa';
}

async function executeRequests(requestCount) {
    const responses = [];
    for (let i = 0; i < requestCount; i++) {
        try {
            const response = await axios.get(`${hostname}/api/ratelimit`);
            responses.push(response.data);
        } catch (error) {
            responses.push(error.response?.data || 'Erro ao realizar requisição');
        }
    }
    return responses;
}

// Rota que faz a chamada simulada
app.get('/api/ratelimit', async (req, res) => {
    try {
        const result = await externalService();
        res.send(result);
    } catch (error) {
        res.status(500).send(`Erro: ${error.message}`);
    }
});

// Rota que faz a chamada simulada múltiplas vezes
app.get('/api/multiple-requests/:count', async (req, res) => {
    try {
        const requestCount = parseInt(req.params.count) || 1;
        const results = await executeRequests(requestCount);
        res.json({ requestCount, responses: results });
    } catch (error) {
        res.status(500).send(`Erro: ${error.message}`);
    }
});

// Iniciando o servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em ${hostname}`);
});