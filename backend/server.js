// npm install express axios cors dotenv
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rota de consulta de produtos protegida
app.get('/api/produtos', async (req, res) => {
    try {
        // Exemplo: Chamada para API do Mercado Livre
        const response = await axios.get('https://api.mercadolivre.com/sites/MLB/search?q=meus-produtos', {
            headers: { 'Authorization': `Bearer ${process.env.ML_ACCESS_TOKEN}` }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Falha na comunicação com o marketplace" });
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));

