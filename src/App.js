import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [viewCoin, setViewCoin] = useState(null);
  const [coinToSearch, setCoinToSearch] = useState(null);
  const [requestStatus, setRequestStatus] = useState({
    loading: true,
    success: false,
    error: false,
  });
  const [more, setMore] = useState(false);

  // COMPARE START ***********************
  const [compare, setCompare] = useState(false);
  const [coinToCompare, setCoinToCompare] = useState(null);
  const [comparedCoin, setComparedCoin] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://binance43.p.rapidapi.com/ticker/24hr",
      headers: {
        "X-RapidAPI-Host": "binance43.p.rapidapi.com",
        "X-RapidAPI-Key": "d1bf3d4f57msh7c755de0179c5e5p15ac54jsn4f0cdd7309b3",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setData(response.data);
        setRequestStatus({
          loading: false,
          success: true,
          error: false,
        });
      })
      .catch(function (error) {
        setRequestStatus({
          loading: false,
          success: false,
          error: true,
        });
        console.error(error);
      });
  }, []);
  function handleChoice(coin) {
    let list = data.filter((crypto) => {
      return `${coin}USDT` === crypto.symbol;
    });

    if (list.length > 0) {
      setViewCoin(list);
    }
    setMore(false);
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        handleChoice(coinToSearch);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  const handleCompare = () => {
    console.log(coinToCompare);
    setCoinToCompare(coinToCompare.toUpperCase());
    let list = data.filter((coin) => {
      return coin.symbol === `${coinToCompare}USDT`;
    });
    setComparedCoin(list);
  };
  const handleConsole = () => {
    console.log(comparedCoin);
  };

  return (
    <div className="layout">
      <div>
        <button onClick={() => handleConsole()}>console.log</button>
        <h1>Cryptocurrency</h1>
        {requestStatus.loading && <h2>LOADING...</h2>}
        {requestStatus.error && <button>RETRY</button>}
        {requestStatus.success && (
          <div>
            <div>
              <input
                onInput={(e) => setCoinToSearch(e.target.value.toUpperCase())}
                maxLength={5}
                type="text"
              />
              <button onClick={() => handleChoice(coinToSearch)}>Search</button>
            </div>
            <div>
              <button onClick={() => handleChoice("BTC")}>See BTC</button>
              <button onClick={() => handleChoice("ETH")}>See ETH</button>
              <button
                onClick={() => {
                  setCompare(!compare);
                }}
              >
                Compare with
              </button>
              {compare && (
                <div>
                  <input
                    onInput={(e) =>
                      setCoinToCompare(e.target.value.toUpperCase())
                    }
                    maxLength={5}
                    type="text"
                  />
                  <button onClick={() => handleCompare()}>Compare</button>
                </div>
              )}
            </div>
            <div className="coinsResult">
              {viewCoin ? (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <td>{viewCoin[0].symbol}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{viewCoin[0].lowPrice.slice(0, 9)}</td>
                        <td>high price</td>
                      </tr>
                      {more && (
                        <>
                          <tr>
                            <td>{viewCoin[0].highPrice.slice(0, 9)}</td>
                            <td>high price</td>
                          </tr>
                          <tr>
                            <td>{viewCoin[0].lowPrice.slice(0, 9)} </td>
                            <td>low price</td>
                          </tr>
                          <tr>
                            <td>
                              {viewCoin[0].priceChangePercent.slice(0, 9)}
                            </td>
                            <td>% change </td>
                          </tr>
                          <tr>
                            <td>{viewCoin[0].count}</td>
                            <td>count</td>
                          </tr>
                          <tr>
                            <td>{viewCoin[0].volume.slice(0, 9)}</td>
                            <td>volume</td>
                          </tr>
                          <tr>
                            <td>{viewCoin[0].openPrice.slice(0, 9)}</td>
                            <td>open price</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  <button onClick={() => setMore(!more)}>
                    {more ? "less" : "more"}
                  </button>
                </div>
              ) : (
                ""
              )}
              {comparedCoin && compare ? (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <td>{comparedCoin[0].symbol}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{comparedCoin[0].lowPrice.slice(0, 9)}</td>
                        <td>high price</td>
                      </tr>
                      {more && (
                        <>
                          <tr>
                            <td>{comparedCoin[0].highPrice.slice(0, 9)}</td>
                            <td>high price</td>
                          </tr>
                          <tr>
                            <td>{comparedCoin[0].lowPrice.slice(0, 9)} </td>
                            <td>low price</td>
                          </tr>
                          <tr>
                            <td>
                              {comparedCoin[0].priceChangePercent.slice(0, 9)}
                            </td>
                            <td>% change </td>
                          </tr>
                          <tr>
                            <td>{comparedCoin[0].count}</td>
                            <td>count</td>
                          </tr>
                          <tr>
                            <td>{comparedCoin[0].volume.slice(0, 9)}</td>
                            <td>volume</td>
                          </tr>
                          <tr>
                            <td>{comparedCoin[0].openPrice.slice(0, 9)}</td>
                            <td>open price</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
      <ul>
        <li>DOGE-Dogecoin</li>
        <li>DOT-Polkadot</li>
        <li>SHIB-SHIBA INU</li>
        <li>WBTC-Wrapped Bitcoin</li>
        <li>DAI-Dai</li>
        <li>MATIC-Polygon</li>
        <li>NEAR-NEAR</li>
        <li>LTC-Litecoin</li>
      </ul>
    </div>
  );
}

export default App;
