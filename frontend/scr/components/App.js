import React, { useEffect, useState } from 'react';

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  return (
    <div className="dashboard">
      <h1>Painel de Controle</h1>
      <div className="grid">
        {produtos.map(p => (
          <div key={p.id} className="card">
            <img src={p.thumbnail} alt={p.title} />
            <h3>{p.title}</h3>
            <p>Preço: R$ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

