import { useEffect, useState } from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import FavTable from "./FavTable";

function Favs({
  favourites,
  setFavourites,
  results,
  input,
  apiData,
  inputVal,
  setInputVal,
}) {
  const goTo = () => {
    console.log("go to");
  };

  // const favList = favourites.map((ele) => {
  //   return (
  //     <div key={ele}>
  //       <button onClick={goTo}>{ele}</button>
  //       <br></br>
  //     </div>
  //   );
  // });

  return (
    <>
      <h1>Favs</h1>
      <Button
        onClick={() => {
          setFavourites([]);
          localStorage.removeItem("favourites");
        }}
      >
        Clear All
      </Button>
      <hr></hr>
      <FavTable favourites={favourites} />
      {/* {favList} */}
    </>
  );
}

export default Favs;
