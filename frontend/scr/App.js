import React, { useState } from 'react';

function App() {
  const [produtos, setProdutos] = useState([]);

  const conectarML = () => {
    window.location.href = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.REACT_APP_ML_ID}&redirect_uri=http://localhost:3000/auth/callback`;
  };

  const carregarProdutos = async () => {
    const res = await fetch('http://localhost:5000/api/meus-produtos');
    const data = await res.json();
    setProdutos(data.results);
  };

  return (
    <div>
      <h1>Painel do Vendedor</h1>
      <button onClick={conectarML}>Conectar Mercado Livre</button>
      <button onClick={carregarProdutos}>Listar meus produtos</button>
      
      <div className="lista">
        {produtos.map(p => <div key={p}>Produto ID: {p}</div>)}
      </div>
    </div>
  );
}
export default App;
