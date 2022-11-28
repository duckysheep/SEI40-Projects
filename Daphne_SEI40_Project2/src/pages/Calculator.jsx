import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";

function Calculator({ results }) {
  const [apiData, setApiData] = useState({});
  //search for multiple items with | seperator

  console.log("calc", results[0][0]?.name);

  // const input = "Steel bar";
  const input = `${results[0][0]?.name}|${results[0][1]?.name}`;

  useEffect(() => {
    //runescape ge api
    //https://api.weirdgloop.org/#/exchange/getExchangeCurrentPrice
    const apiUrl = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${input}&lang=en`;
    // const apiUrl = `https://runescape.wiki/api.php?action=parse&format=json&page=${input}&redirects=1&prop=wikitext&formatversion=2`;

    const makeApiCall = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log(data);
      // console.log("data", Object.values(data)[0]);
      setApiData(Object.values(data));
      console.log("apiData", apiData);
      // for (let i = 1; data.parse.wikitext.search(`mat${i}`) >= 0; i++) {
      //   console.log(
      //     i,
      //     data.parse.wikitext.search(`mat${i}`),
      //     data.parse.wikitext.search(`mat${i}price`),
      //     data.parse.wikitext.substring(
      //       data.parse.wikitext.search(`mat${i}`),
      //       data.parse.wikitext.search(`mat${i}price`) - 2
      //     )
      //   );
      // }
    };

    makeApiCall();
  }, []);

  return (
    <>
      <h1>Calculator</h1>
      <p>{/* Price of <b>{results[0]}</b> : <b>{apiData[0]?.price}gp</b> */}</p>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {/* <th>Item: {results[0]}</th>
                  <th>Amount: 1</th>
                  <th>Price {apiData[0]?.price}</th> */}
                </tr>
              </thead>
            </Table>
          </Accordion.Header>
          <Accordion.Body>
            Mats
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Materials</th>
                  <th>Quantity Req</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{results[0][0]?.name}</td>
                  <td>{results[0][0]?.quantity}</td>
                  <td>{apiData[1]?.price}</td>
                </tr>
                <tr>
                  <td>{results[0][1]?.name}</td>
                  <td>{results[0][1]?.quantity}</td>
                  <td>{apiData[0]?.price}</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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
