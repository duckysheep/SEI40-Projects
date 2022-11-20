import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movieData, setMovieData] = useState(0);

  useEffect(() => {
    const apiUrl = `https://services.runescape.com/m=itemdb_rs/api/catalogue/items.json?category=9&alpha=c&page=1`;

    const makeApiCall = () => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log("apiData", data);
          setMovieData(data);
        });
    };
    makeApiCall();
  }, []);

  return (
    <div className="App">
      <h1>Project 2</h1>
      <div className="temp">
        <h2>API #1 check</h2>
        <h2>API #2 check</h2>
      </div>
    </div>
  );
}

export default App;
