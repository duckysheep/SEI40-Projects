import { useState } from "react";
import { Accordion, Table } from "react-bootstrap";

function FavTable({ favourites }) {
  const [state, setState] = useState({});

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  }

  return (
    <div>
      {favourites.map((ele) => {
        return (
          <Accordion defaultActiveKey="1" key={ele.item.name}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item: {ele.item.name}</th>
                      <th>Amount made: {ele.item.qtyProduced}</th>
                      <th>
                        <input
                          type="number"
                          min="1"
                          name={ele.item.name}
                          onChange={handleChange}
                          value={state[ele.item.name]}
                        ></input>
                      </th>
                      <th>
                        Price:{" "}
                        {ele.apiData[ele.item.name]?.price !== undefined
                          ? (
                              ele.apiData[ele.item.name]?.price *
                              state[ele.item.name] *
                              ele.item.qtyRequired
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
                  <tbody>
                    {ele.mats.map((matsEle) => {
                      let imgSrc =
                        "https://runescape.wiki/images/" +
                        matsEle.image.replaceAll(" ", "_");
                      return (
                        <tr key={matsEle.name}>
                          <td>
                            <img src={imgSrc}></img> {matsEle.name}
                          </td>
                          <td>
                            {ele.apiData[matsEle.name]?.price !== undefined
                              ? (
                                  ele.apiData[matsEle.name]?.price *
                                  state[ele.item.name]
                                ).toLocaleString()
                              : "Not Tradeable"}
                          </td>
                          <td>
                            {(
                              matsEle?.quantity * state[ele.item.name]
                            ).toLocaleString()}
                          </td>
                          <td>
                            {ele.apiData[matsEle.name]?.price !== undefined
                              ? (
                                  ele.apiData[matsEle.name]?.price *
                                  matsEle?.quantity *
                                  state[ele.item.name]
                                ).toLocaleString()
                              : "Not Tradeable"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </div>
  );
}
export default FavTable;
