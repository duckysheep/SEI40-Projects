import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState({});
  const item = "great%20white%20shark";
  const spacedItem = item.replace(/%20/g, " ");

  useEffect(() => {
    //runescape ge api
    //https://api.weirdgloop.org/#/exchange/getExchangeCurrentPrice
    const apiUrl = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${item}&lang=en`;

    const makeApiCall = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("data", Object.values(data)[0]);
      setApiData(Object.values(data)[0]);
      // console.log("apiData", apiData);
    };

    makeApiCall();
  }, []);

  // useEffect(() => {
  //   const apiUrl = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${item}&lang=en`;
  //   const makeApiCall = () => {
  //     fetch(apiUrl)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("data", Object.values(data)[0].price);
  //         setApiData(data);
  //         console.log("apiData", apiData);
  //       });
  //   };
  //   makeApiCall();
  // }, []);

  return (
    <div className="App">
      <h1>Project 2</h1>
      <div className="temp">
        <h2>API check</h2>
        <p>
          Price of <b>{spacedItem}</b> : <b>{apiData.price}gp</b>
        </p>
      </div>
    </div>
  );
}

export default App;
