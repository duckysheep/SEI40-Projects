import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";

function Calculator({
  results,
  input,
  favourites,
  setFavourites,
  apiData,
  setApiData,
}) {
  // const [apiData, setApiData] = useState({});
  const [inputVal, setInputVal] = useState(1);

  const resultsName = results[0].mats.map((ele) => ele.name);
  resultsName.push(input);
  const searchStr = resultsName.join("|");

  useEffect(() => {
    //runescape ge api
    //https://api.weirdgloop.org/#/exchange/getExchangeCurrentPrice
    const apiUrl = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${searchStr}&lang=en`;

    const makeApiCall = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setApiData(data);
    };

    makeApiCall();
  }, [searchStr]);

  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  const matInfo = results[0].mats.map((ele) => {
    let imgSrc =
      "https://runescape.wiki/images/" + (ele?.image).replaceAll(" ", "_");

    return (
      <tr key={ele.name}>
        <td>
          <img src={imgSrc}></img> {ele?.name}
        </td>
        <td>
          {apiData[ele?.name]?.price !== undefined
            ? apiData[ele?.name]?.price * inputVal
            : "Not Tradeable"}
        </td>
        <td>{ele?.quantity * inputVal}</td>
        <td>
          {apiData[ele?.name]?.price !== undefined
            ? apiData[ele?.name]?.price * ele?.quantity * inputVal
            : "Not Tradeable"}
        </td>
      </tr>
    );
  });

  const addFav = () => {
    console.log(input);
    favourites.includes(input)
      ? console.log("already added")
      : setFavourites([...favourites, input]);
  };
  localStorage.setItem("favourites", JSON.stringify(favourites));

  return (
    <>
      <h2>Calculator</h2>
      {/* <p>
        Price of <b>{input}</b> : <b>{apiData[input]?.price}gp</b>
      </p> */}
      <div>
        {input != null ? (
          <>
            {favourites.includes(input) ? (
              <BsStarFill style={{ color: "orange" }} size={30} />
            ) : (
              <BsStar size={30} onClick={addFav} />
            )}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Item: {input}</th>
                        <th>Amount made: {results[0].quantity}</th>
                        <th>
                          <input
                            type="number"
                            min="1"
                            onChange={handleChange}
                            value={inputVal}
                          ></input>
                        </th>
                        <th>
                          Price:{" "}
                          {apiData[input]?.price !== undefined
                            ? apiData[input]?.price *
                              inputVal *
                              results[0].quantity
                            : "Not Tradeable"}
                        </th>
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
          </>
        ) : (
          <></>
        )}

        {/* {favourites.includes(input) ? (
          <BsStarFill style={{ color: "orange" }} size={30} />
        ) : (
          <BsStar size={30} onClick={addFav} />
        )}
        {input == null ? (
          <></>
        ) : (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item: {input}</th>
                      <th>Item: {results[0][0].name}</th>
                      <th>Amount: 1</th>
                      <th>
                        Price:{" "}
                        {apiData[input]?.price !== undefined
                          ? apiData[input]?.price
                          : "Not Tradeable"}
                      </th>
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
        )} */}
      </div>
    </>
  );
}

export default Calculator;
