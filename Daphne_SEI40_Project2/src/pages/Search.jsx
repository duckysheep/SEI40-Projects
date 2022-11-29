import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
// import itemData from "../assets/data/itemdata";
import itemDataCopy from "../data/itemdatacopy";
import Calculator from "./Calculator";
import Select from "react-select";

// console.log(Object.keys(itemDataCopy.results));

//https://codesandbox.io/s/upbeat-torvalds-kzcug?file=/src/App.js
const SelectBox = ({ options, name, onChange }) => {
  const [optionSelected, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    onChange(selected.value);
    //console.log(selected)
    setSelectedOptions(selected);
  };

  return (
    <Select
      options={options}
      isLoading={!options}
      closeMenuOnSelect={true}
      onChange={handleChange}
      value={optionSelected}
      name={name}
    />
  );
};

const data = Object.keys(itemDataCopy.results);
const categories = data.map((item) => ({ value: item, label: item }));

function Search({ setResults, results, favourites, setFavourites }) {
  const [status, setStatus] = useState("idle");
  const [searchParams, setSearchParams] = useSearchParams();
  const [apiData, setApiData] = useState({});

  const input = searchParams.get("input");

  const matData =
    itemDataCopy.results[input]?.printouts["Production JSON"][0].mats;

  const handleChange = (e) => {
    console.log("e", { input: e });
    setSearchParams({ input: e });
    setResults([itemDataCopy.results[e]?.printouts["Production JSON"][0]]);
  };

  // console.log(results[0].quantity);
  // console.log(results[0].mats);
  return (
    <>
      <h1>Search</h1>
      <SelectBox options={categories} name="input" onChange={handleChange} />
      {status === "loading" ? (
        <progress />
      ) : (
        <>
          {/* <p>{input}</p> */}
          <hr></hr>
          {results[0] === undefined ? (
            console.log("undefined results")
          ) : (
            <Calculator
              results={results}
              input={input}
              favourites={favourites}
              setFavourites={setFavourites}
              apiData={apiData}
              setApiData={setApiData}
            />
          )}

          {/* <p>{results[0]}</p> */}
        </>
      )}
    </>
  );
}

export default Search;
