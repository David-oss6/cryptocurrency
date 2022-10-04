import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import bitcoin from "./img/bitcoin-img.png";

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

  const [compare, setCompare] = useState(false);
  const [coinToCompare, setCoinToCompare] = useState(null);
  const [comparedCoin, setComparedCoin] = useState(null);
  const [compareResult, setCompareResult] = useState();

  function getData() {
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
  }
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
        getData();
        setRequestStatus({
          loading: false,
          success: false,
          error: true,
        });
        console.error(error);
      });
  }, []);
  function handleChoice(coin) {
    coin = coin.toUpperCase();
    let list = data.filter((crypto) => {
      return `${coin}USDT` === crypto.symbol;
    });
    if (list.length > 0) {
      setViewCoin(list);
    }
  }

  const handleCompare = () => {
    setCoinToCompare(coinToCompare.toUpperCase());
    let list = data.filter((coin) => {
      return coin.symbol === `${coinToCompare}USDT`;
    });

    if (list.length > 0) {
      setComparedCoin(list);
    }

    let compareList = data.filter((coin) => {
      return `${coinToSearch}${coinToCompare}` === coin.symbol;
    });

    setCompareResult(compareList);
  };

  return (
    <div>
      <header>
        <h1>Cryptocurrency</h1>
        <img className="bitcoin" src={bitcoin} alt="bitcoin" />
      </header>
      <div className="background">
        {requestStatus.loading && <h2 className="loading">LOADING...</h2>}
        {requestStatus.error && <p>RETRYING...</p>}
        {requestStatus.success && (
          <div>
            <div className="container">
              <div className="layout">
                <div className="inputs_container">
                  <div className="buscar_container">
                    <input
                      className="buscar_input"
                      onChange={(e) =>
                        setCoinToSearch(e.target.value.toUpperCase())
                      }
                      maxLength={5}
                      type="text"
                      placeholder=" Crypto initials"
                    />

                    <button
                      className="buscar_btn"
                      onClick={() => handleChoice(coinToSearch)}
                    >
                      Search
                    </button>
                  </div>

                  <button
                    className="compareWith_btn"
                    onClick={() => {
                      setCompare(!compare);
                    }}
                  >
                    Compare with
                  </button>

                  {compare && (
                    <div className="compare_container">
                      <input
                        placeholder=" Crypto initials"
                        className="compare_input"
                        onChange={(e) =>
                          setCoinToCompare(e.target.value.toUpperCase())
                        }
                        maxLength={5}
                        type="text"
                      />
                      <button
                        className="compare_btn"
                        onClick={() => handleCompare()}
                      >
                        Compare
                      </button>
                    </div>
                  )}
                </div>

                <ul className="coinUl">
                  <li onClick={() => handleChoice("btc")} className="coinLi">
                    BTC-Bitcoin
                  </li>
                  <li onClick={() => handleChoice("eth")} className="coinLi">
                    ETH-Ethereum
                  </li>
                  <li onClick={() => handleChoice("doge")} className="coinLi">
                    DOGE-Dogecoin
                  </li>
                  <li onClick={() => handleChoice("dot")} className="coinLi">
                    DOT-Polkadot
                  </li>
                  <li onClick={() => handleChoice("shib")} className="coinLi">
                    SHIB-SHIBA INU
                  </li>

                  <li onClick={() => handleChoice("matic")} className="coinLi">
                    MATIC-Polygon
                  </li>
                  <li onClick={() => handleChoice("near")} className="coinLi">
                    NEAR-NEAR
                  </li>
                  <li onClick={() => handleChoice("ltc")} className="coinLi">
                    LTC-Litecoin
                  </li>

                  <li onClick={() => handleChoice("xrp")} className="coinLi">
                    XRP-XRP
                  </li>
                  <li onClick={() => handleChoice("ada")} className="coinLi">
                    ADA-Cardano
                  </li>
                  <li onClick={() => handleChoice("sol")} className="coinLi">
                    SOL-Solana
                  </li>
                  <li onClick={() => handleChoice("busd")} className="coinLi">
                    BUSD-Binance USD
                  </li>
                </ul>
              </div>
            </div>
            <div className="container">
              <div className="coinsResult">
                {viewCoin ? (
                  <div>
                    <table className="myTable">
                      <thead>
                        <tr>
                          <td className="resultCoinName">
                            {viewCoin[0].symbol}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{viewCoin[0].lastPrice.slice(0, 9)}</td>
                          <td className="coinPriceText">actual price</td>
                        </tr>
                        {more && (
                          <>
                            <tr>
                              <td>{viewCoin[0].highPrice.slice(0, 9)}</td>
                              <td className="coinPriceText">high price</td>
                            </tr>
                            <tr>
                              <td>{viewCoin[0].lowPrice.slice(0, 9)} </td>
                              <td className="coinPriceText">low price</td>
                            </tr>
                            <tr>
                              <td>
                                {viewCoin[0].priceChangePercent.slice(0, 9)}
                              </td>
                              <td className="coinPriceText">% change </td>
                            </tr>
                            <tr>
                              <td>{viewCoin[0].count}</td>
                              <td className="coinPriceText">count</td>
                            </tr>
                            <tr>
                              <td>{viewCoin[0].volume.slice(0, 9)}</td>
                              <td className="coinPriceText">volume</td>
                            </tr>
                            <tr>
                              <td>{viewCoin[0].openPrice.slice(0, 9)}</td>
                              <td className="coinPriceText">open price</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                    <button
                      className="moreLess_btn"
                      onClick={() => setMore(!more)}
                    >
                      {more ? "view less" : "more..."}
                    </button>
                  </div>
                ) : (
                  ""
                )}

                {comparedCoin && compare ? (
                  <div>
                    <table className="myTable">
                      <thead>
                        <tr>
                          <td className="resultCoinName">
                            {comparedCoin[0].symbol}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{comparedCoin[0].lowPrice.slice(0, 9)}</td>
                          <td className="coinPriceText">high price</td>
                        </tr>
                        {more && (
                          <>
                            <tr>
                              <td>{comparedCoin[0].highPrice.slice(0, 9)}</td>
                              <td className="coinPriceText">high price</td>
                            </tr>
                            <tr>
                              <td>{comparedCoin[0].lowPrice.slice(0, 9)} </td>
                              <td className="coinPriceText">low price</td>
                            </tr>
                            <tr>
                              <td>
                                {comparedCoin[0].priceChangePercent.slice(0, 9)}
                              </td>
                              <td className="coinPriceText">% change </td>
                            </tr>
                            <tr>
                              <td>{comparedCoin[0].count}</td>
                              <td className="coinPriceText">count</td>
                            </tr>
                            <tr>
                              <td>{comparedCoin[0].volume.slice(0, 9)}</td>
                              <td className="coinPriceText">volume</td>
                            </tr>
                            <tr>
                              <td>{comparedCoin[0].openPrice.slice(0, 9)}</td>
                              <td className="coinPriceText">open price</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                    <button
                      className="moreLess_btn"
                      onClick={() => setMore(!more)}
                    >
                      {more ? "view less" : "more..."}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
