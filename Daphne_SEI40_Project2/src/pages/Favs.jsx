import { Button } from "react-bootstrap";
import FavTable from "./FavTable";

function Favs({ favourites, setFavourites }) {
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
    </>
  );
}

export default Favs;
