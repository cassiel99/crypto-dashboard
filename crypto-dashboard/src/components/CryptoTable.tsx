import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

interface Crypto {
  id: number;
  symbol: string;
  name: string;
  price: number;
  percentChange24h: number;
  marketCap: number;
  volume24h: number;
}

export default function CryptoTable() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/cryptos")
      .then((res) => {
        setCryptos(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    axios
      .post("http://localhost:3000/api/fetch-cryptos")
      .then(() => fetchData())
      .catch(console.error);
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <h1>Топ 50 Криптовалюты</h1>
        <button onClick={refreshData}>Обновить данные</button>
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticker</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market Cap</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((coin, index) => (
                <tr key={coin.id}>
                  <td data-label="#"> {index + 1}</td>
                  <td data-label="Ticker">{coin.symbol.toUpperCase()}</td>
                  <td data-label="Name">{coin.name}</td>
                  <td data-label="Price">${coin.price.toFixed(2)}</td>
                  <td
                    data-label="24h Change"
                    className={coin.percentChange24h >= 0 ? "positive" : "negative"}
                  >
                    {coin.percentChange24h?.toFixed(2)}%
                  </td>
                  <td data-label="Market Cap">${Number(coin.marketCap).toLocaleString()}</td>
                  <td data-label="Volume">${Number(coin.volume24h).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
