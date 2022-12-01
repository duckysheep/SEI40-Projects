import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";

function ItemResultTable({
  results,
  input,
  favourites,
  apiData,
  inputVal,
  setInputVal,
}) {
  const matInfo = results[0]?.mats.map((ele) => {
    let imgSrc =
      "https://runescape.wiki/images/" + (ele?.image).replaceAll(" ", "_");

    return (
      <tr key={ele.name}>
        <td>
          <img src={imgSrc}></img> {ele?.name}
        </td>
        <td>
          {apiData[ele?.name]?.price !== undefined
            ? (apiData[ele?.name]?.price * inputVal).toLocaleString()
            : "Not Tradeable"}
        </td>
        <td>{(ele?.quantity * inputVal).toLocaleString()}</td>
        <td>
          {apiData[ele?.name]?.price !== undefined
            ? (
                apiData[ele?.name]?.price *
                ele?.quantity *
                inputVal
              ).toLocaleString()
            : "Not Tradeable"}
        </td>
      </tr>
    );
  });

  // console.log("results[0]?.mats", results[0]?.mats);

  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  return (
    <>
      <div>
        {input != null ? (
          <>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Item: {input}</th>
                        <th>Amount made: {results[0]?.quantity}</th>
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
                            ? (
                                apiData[input]?.price *
                                inputVal *
                                results[0].quantity
                              ).toLocaleString()
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
      </div>
    </>
  );
}

export default ItemResultTable;
