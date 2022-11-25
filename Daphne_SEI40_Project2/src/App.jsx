import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Search from "./pages/Search";

function App() {
  const [favs, setFavs] = useState([]);

  const addFav = (card) => setFavs([...favs, card]);

  const delFav = (card) => setFavs([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="calculator" element={<Calculator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
