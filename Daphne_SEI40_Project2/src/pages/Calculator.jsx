import { useEffect, useState } from "react";

function Calculator() {
  const [apiData, setApiData] = useState({});
  const item = "great%20white%20shark";
  const spacedItem = item.replace(/%20/g, " ");
  const input = "iron axe";

  useEffect(() => {
    //runescape ge api
    //https://api.weirdgloop.org/#/exchange/getExchangeCurrentPrice
    // const apiUrl = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${item}&lang=en`;
    const apiUrl = `https://runescape.wiki/api.php?action=parse&format=json&page=${input}&redirects=1&prop=wikitext&formatversion=2`;

    const makeApiCall = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log(data);
      console.log(data.parse.wikitext);
      // console.log("data", Object.values(data)[0]);
      setApiData(Object.values(data)[0]);
      // console.log("apiData", apiData);
      for (let i = 1; data.parse.wikitext.search(`mat${i}`) >= 0; i++) {
        console.log(
          i,
          data.parse.wikitext.search(`mat${i}`),
          data.parse.wikitext.search(`mat${i}price`),
          data.parse.wikitext.substring(
            data.parse.wikitext.search(`mat${i}`),
            data.parse.wikitext.search(`mat${i}price`) - 2
          )
        );
        // console.log(
        //   i,
        //   data.parse.wikitext.search(`mat${i}qty`),
        //   data.parse.wikitext.search(`mat${i + 1}`),
        //   data.parse.wikitext.substring(
        //     data.parse.wikitext.search(`mat${i}qty`),
        //     data.parse.wikitext.search(`mat${i + 1}`)
        //   )
        // );
      }
    };

    makeApiCall();
  }, []);

  return (
    <>
      <h1>Calculator</h1>
      <p>
        Price of <b>{input}</b> : <b>{apiData.price}gp</b>
      </p>
    </>
  );
}

export default Calculator;

// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [apiData, setApiData] = useState({});
//   const item = "great%20white%20shark";
//   const spacedItem = item.replace(/%20/g, " ");
//   const input = "iron axe";

//   useEffect(() => {
//     //runescape ge api
//     //https://api.weirdgloop.org/#/exchange/getExchangeCurrentPrice
//     // const apiUrl = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${item}&lang=en`;
//     const apiUrl = `https://runescape.wiki/api.php?action=parse&format=json&page=${input}&redirects=1&prop=wikitext&formatversion=2`;

//     const makeApiCall = async () => {
//       const res = await fetch(apiUrl);
//       const data = await res.json();
//       console.log(data);
//       console.log(data.parse.wikitext);
//       // console.log("data", Object.values(data)[0]);
//       setApiData(Object.values(data)[0]);
//       // console.log("apiData", apiData);
//       for (let i = 1; data.parse.wikitext.search(`mat${i}`) >= 0; i++) {
//         console.log(
//           i,
//           data.parse.wikitext.search(`mat${i}`),
//           data.parse.wikitext.search(`mat${i}price`),
//           data.parse.wikitext.substring(
//             data.parse.wikitext.search(`mat${i}`),
//             data.parse.wikitext.search(`mat${i}price`) - 2
//           )
//         );
//         // console.log(
//         //   i,
//         //   data.parse.wikitext.search(`mat${i}qty`),
//         //   data.parse.wikitext.search(`mat${i + 1}`),
//         //   data.parse.wikitext.substring(
//         //     data.parse.wikitext.search(`mat${i}qty`),
//         //     data.parse.wikitext.search(`mat${i + 1}`)
//         //   )
//         // );
//       }
//     };

//     makeApiCall();
//   }, []);

//   // useEffect(() => {
//   //   const apiUrl = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${item}&lang=en`;
//   //   const makeApiCall = () => {
//   //     fetch(apiUrl)
//   //       .then((res) => res.json())
//   //       .then((data) => {
//   //         console.log("data", Object.values(data)[0].price);
//   //         setApiData(data);
//   //         console.log("apiData", apiData);
//   //       });
//   //   };
//   //   makeApiCall();
//   // }, []);

//   return (
//     <div className="App">
//       <h1>Project 2</h1>
//       <div className="temp">
//         <h2>API check</h2>
//         <p>
//           Price of <b>{input}</b> : <b>{apiData.price}gp</b>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;
