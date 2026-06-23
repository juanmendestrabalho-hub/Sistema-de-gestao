const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Memória temporária (SUBSTITUI O BANCO DE DADOS NESTE PROTÓTIPO)
let userTokens = {}; 

// Rota de Callback após login no ML
app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;
    try {
        // Usa a lógica de troca de token (veja auth.js abaixo)
        const response = await axios.post('https://api.mercadolivre.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: process.env.ML_CLIENT_ID,
            client_secret: process.env.ML_CLIENT_SECRET,
            code: code,
            redirect_uri: 'http://localhost:3000/auth/callback'
        });
        
        userTokens['session_01'] = response.data.access_token;
        res.send("Conexão realizada com sucesso! Você pode fechar esta aba.");
    } catch (err) {
        res.status(500).send("Erro na autenticação.");
    }
});

// Rota para buscar produtos do vendedor conectado
app.get('/api/meus-produtos', async (req, res) => {
    const token = userTokens['session_01'];
    if (!token) return res.status(401).send("Usuário não conectado");

    const response = await axios.get('https://api.mercadolivre.com/users/me/items/search', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    res.json(response.data);
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
