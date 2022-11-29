import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Search from "./pages/Search";
import Favs from "./pages/Favs";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="search"
              element={
                <Search
                  results={results}
                  setResults={setResults}
                  setFavourites={setFavourites}
                  favourites={favourites}
                />
              }
            />
            <Route
              path="favs"
              element={
                <Favs favourites={favourites} setFavourites={setFavourites} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
