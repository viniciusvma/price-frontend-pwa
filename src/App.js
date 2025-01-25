import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tonelada, setTonelada] = useState("");
  const [dolar, setDolar] = useState(null);
  const [totalKg, setTotalKg] = useState(null);

  useEffect(() => {
    const fetchDolar = async () => {
      try {
        const response = await axios.get("https://price-backend-tau.vercel.app/dolar");
        setDolar(response.data.dolar);
      } catch (error) {
        alert("Erro ao obter a cotação do dólar.");
      }
    };

    fetchDolar();
  }, []);

  const calcularPreco = async () => {
    if (!tonelada) {
      alert("Por favor, insira o valor da tonelada.");
      return;
    }

    try {
      const response = await axios.post("https://price-backend-tau.vercel.app/calculate", {
        tonelada: parseFloat(tonelada),
      });
      setTotalKg(response.data.totalKg);
      setTonelada("");
    } catch (error) {
      alert("Erro ao calcular o preço. Verifique sua conexão.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Calcular Preço EX</h1>

      {dolar !== null && (
        <div className="dolar-container shared-width">
          <p className="dolar-text">Cotação do Dólar</p>
          <p className="dolar-value">R$ {dolar.toFixed(2)}</p>
        </div>
      )}

      <input
        type="number"
        className="input shared-width"
        placeholder="Valor da Tonelada (em dólares)"
        value={tonelada}
        onChange={(e) => setTonelada(e.target.value)}
      />

      <button className="calculate-button shared-width" onClick={calcularPreco}>
        Calcular
      </button>

      {totalKg !== null && (
        <div className="result-container shared-width">
          <p className="result-text">Total/KG R$ {totalKg.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
