import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Search from "./pages/Search";
import Favs from "./pages/Favs";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [inputVal, setInputVal] = useState(1);
  const [apiData, setApiData] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites) {
      setFavourites(favourites);
    }
  }, []);

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
                  inputVal={inputVal}
                  setInputVal={setInputVal}
                  input={input}
                  setInput={setInput}
                  apiData={apiData}
                  setApiData={setApiData}
                />
              }
            />
            <Route
              path="favs"
              element={
                <Favs
                  results={results}
                  input={input}
                  favourites={favourites}
                  setFavourites={setFavourites}
                  apiData={apiData}
                  setApiData={setApiData}
                  inputVal={inputVal}
                  setInputVal={setInputVal}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
