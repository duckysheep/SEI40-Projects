import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";

function Calculator({ results, input }) {
  const [apiData, setApiData] = useState({});
  //search for multiple items with | seperator
  // console.log(results[0]);
  // console.log("calc", results[0][0]?.name);

  // const input = "Steel bar";
  // const searchInput = `${input}|${results[0][0]?.name}|${results[0][1]?.name}`;
  // console.log(searchInput);

  const resultsName = results[0].map((ele) => ele.name);
  resultsName.push(input);
  const searchStr = resultsName.join("|");
  console.log("str", searchStr);

  useEffect(() => {
    //runescape ge api
    //https://api.weirdgloop.org/#/exchange/getExchangeCurrentPrice
    const apiUrl = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${searchStr}&lang=en`;
    // const apiUrl = `https://runescape.wiki/api.php?action=parse&format=json&page=${input}&redirects=1&prop=wikitext&formatversion=2`;

    const makeApiCall = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      // console.log(data);
      // console.log("data", Object.values(data)[0]);
      // console.log(
      //   `${results[0][1]?.name} price`,
      //   data[results[0][1]?.name]?.price
      // );
      setApiData(data);
      // setApiData(Object.values(data));
      // console.log("apiData", apiData);
    };

    makeApiCall();
  }, [searchStr]);

  const matInfo = results[0].map((ele) => {
    let imgSrc =
      "https://runescape.wiki/images/" + (ele?.image).replaceAll(" ", "_");
    // console.log(imgSrc);

    return (
      <tr key={ele.name}>
        <td>
          <img src={imgSrc}></img> {ele?.name}
        </td>
        <td>{apiData[ele?.name]?.price}</td>
        <td>{ele?.quantity}</td>
        <td>{apiData[ele?.name]?.price * ele?.quantity}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Calculator</h1>
      {/* <p>
        Price of <b>{input}</b> : <b>{apiData[input]?.price}gp</b>
      </p> */}
      <div>
        <BsStar size={30} />
        <BsStarFill style={{ color: "orange" }} size={30} />
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item: {input}</th>
                    <th>Amount: 1</th>
                    <th>Price: {apiData[input]?.price}</th>
                  </tr>
                </thead>
              </Table>
            </Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Materials</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>{matInfo}</tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
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
