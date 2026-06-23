const axios = require('axios');

// Função para trocar o código de autorização pelo token de acesso
async function trocarCodigoPorToken(code) {
    const url = 'https://api.mercadolivre.com/oauth/token';
    const params = {
        grant_type: 'authorization_code',
        client_id: process.env.ML_CLIENT_ID,
        client_secret: process.env.ML_CLIENT_SECRET,
        code: code,
        redirect_uri: 'https://seusite.com/auth/callback' // Deve ser igual ao cadastrado no ML
    };

    try {
        const response = await axios.post(url, null, { params });
        return response.data; // Retorna access_token, refresh_token, etc.
    } catch (error) {
        console.error("Erro na autenticação:", error.response?.data || error.message);
        throw new Error("Falha ao obter token");
    }
}

module.exports = { trocarCodigoPorToken };

