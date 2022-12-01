import { useEffect } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import ItemResultTable from "./ItemResultTable";

function Calculator({
  results,
  input,
  favourites,
  setFavourites,
  apiData,
  setApiData,
  inputVal,
  setInputVal,
}) {
  const favCheck = [];
  favourites.map((ele) => {
    favCheck.push(ele.item.name);
  });

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

  const addFav = () => {
    favCheck.includes(input)
      ? console.log("already added")
      : setFavourites([
          ...favourites,
          {
            item: {
              name: input,
              qtyProduced: results[0]?.quantity,
              qtyRequired: inputVal,
              price: apiData[input]?.price,
            },
            mats: results[0]?.mats,
            apiData: apiData,
          },
        ]);
  };

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <>
      <h2>Calculator</h2>
      <div>
        {input != null ? (
          <>
            {favCheck.includes(input) ? (
              <BsStarFill style={{ color: "orange" }} size={30} />
            ) : (
              <BsStar size={30} onClick={addFav} />
            )}

            <ItemResultTable
              results={results}
              input={input}
              favourites={favourites}
              apiData={apiData}
              inputVal={inputVal}
              setInputVal={setInputVal}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Calculator;
