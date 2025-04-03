const express = require('express');
const { bulkhead } = require('cockatiel');
const axios = require('axios');

const app = express();
const port = 8080;
const hostname = `http://localhost:${port}`;

// Configurando bulkhead com cockatiel (Máximo de 2 requisições simultâneas)
const bulkheadPolicy = bulkhead(2);

// Função simulando chamada externa
async function externalService() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Resposta da chamada externa');
        }, 2000);  // Simula uma chamada que demora 2 segundos
    });
}

async function executeRequests(requestCount) {
    const requests = Array.from({ length: requestCount }, () =>
        axios.get(`${hostname}/api/bulkhead`)
            .then(response => response.data)
            .catch(error => error.response?.data || 'Erro ao realizar requisição')
    );

    return Promise.all(requests); // Aguarda todas finalizarem
}

// Rota que faz a chamada simulada
app.get('/api/bulkhead', async (req, res) => {
    try {
        const result = await bulkheadPolicy.execute(() => externalService());
        res.send(result);
    } catch (error) {
        res.status(500).send(`Erro: ${error.message}`);
    }
});

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