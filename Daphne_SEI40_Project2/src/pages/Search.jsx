import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";
import itemDataCopy from "../data/itemdatacopy";
import Calculator from "../components/Calculator";
import Select from "react-select";
import ToggleButtonGroupControlled from "../components/FilterButtons";

//https://codesandbox.io/s/upbeat-torvalds-kzcug?file=/src/App.js
const SelectBox = ({ options, name, onChange }) => {
  const [optionSelected, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    onChange(selected.value);

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

function Search({
  setResults,
  results,
  favourites,
  setFavourites,
  inputVal,
  setInputVal,
  input,
  setInput,
  apiData,
  setApiData,
}) {
  const [status, setStatus] = useState("idle");
  const [searchParams, setSearchParams] = useSearchParams();
  const [skillFilter, setSkillFilter] = useState([]);

  const data = Object.keys(itemDataCopy.results);

  const categories = [];
  const filter = data.filter((item) => {
    if (
      skillFilter.includes(
        itemDataCopy.results[item].printouts[
          "Production JSON"
        ][0].skill.toLowerCase()
      )
    ) {
      categories.push({ value: item, label: item });
    }
  });

  setInput(searchParams.get("input"));

  const matData =
    itemDataCopy.results[input]?.printouts["Production JSON"][0].mats;

  const handleChange = (e) => {
    setSearchParams({ input: e });
    setResults([itemDataCopy.results[e]?.printouts["Production JSON"][0]]);
    setInputVal(1);
  };

  return (
    <>
      <h1>Search</h1>
      <ToggleButtonGroupControlled
        skillFilter={skillFilter}
        setSkillFilter={setSkillFilter}
      />
      <SelectBox options={categories} name="input" onChange={handleChange} />

      {status === "loading" ? (
        <progress />
      ) : (
        <>
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
              inputVal={inputVal}
              setInputVal={setInputVal}
            />
          )}
        </>
      )}
    </>
  );
}

export default Search;
