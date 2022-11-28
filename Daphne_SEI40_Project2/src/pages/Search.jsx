import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
import itemData from "../assets/data/itemdata";

function Search({ setResults, results }) {
  // const [results, setResults] = useState([
  //   "input",
  //   "mat1name",
  //   "mat1qty",
  //   "price",
  // ]);
  const [status, setStatus] = useState("idle");
  const [searchParams, setSearchParams] = useSearchParams();

  const input = searchParams.get("input");
  console.log(input);
  const itemInfoStr = itemData.results[input]?.printouts["Production JSON"][0];
  console.log("searchedItem", itemInfoStr);

  // useEffect(() => {
  //   const fetchCards = async () => {
  //     try {
  //       const request = await fetch(
  //         `https://runescape.wiki/api.php?action=parse&format=json&page=${input}&redirects=1&prop=wikitext&formatversion=2`
  //       );
  //       if (!request.ok) {
  //         throw new Error("Network error");
  //       }
  //       const data = await request.json();

  //       console.log(data.parse.wikitext);

  //       for (let i = 1; data.parse.wikitext.search(`mat${i}`) >= 0; i++) {
  //       console.log(
  //         i,
  //         data.parse.wikitext.search(`mat${i}`),
  //         data.parse.wikitext.search(`mat${i}price`),
  //         data.parse.wikitext.substring(
  //           data.parse.wikitext.search(`mat${i}`),
  //           data.parse.wikitext.search(`mat${i}price`) - 2
  //         )
  //       );
  //       setResults([
  //         ...results,
  //         data.parse.wikitext.substring(
  //           data.parse.wikitext.search(`mat${i}`),
  //           data.parse.wikitext.search(`mat${i}price`) - 2
  //         ),
  //       ]);
  //       console.log(results);
  //       }

  //       setResults(data?.parse?.wikitext);
  //       setStatus("done");
  //     } catch (error) {
  //       console.error(error);
  //       setStatus("error");
  //     }
  //   };
  //   setStatus("loading");
  //   fetchCards();
  // }, [input]);

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // console.log("input", data);
    setSearchParams(data);

    if (itemInfoStr?.search("mats") >= 0) {
      let item1MatsPos = itemInfoStr.slice(itemInfoStr.search("mats"));
      console.log("str", item1MatsPos);

      let mat1Qty = item1MatsPos.slice(
        item1MatsPos.search("quantity") + 11,
        item1MatsPos.search("name") - 3
      );
      console.log("mat1Qty", mat1Qty);

      let mat1Name = item1MatsPos.slice(
        item1MatsPos.search("name") + 7,
        item1MatsPos.search("image") - 3
      );
      console.log("mat1Price", mat1Name);
      setResults([input, mat1Name, mat1Qty, "price"]);
      // console.log("results", results);
    }
  };

  return (
    <>
      <h2>Search</h2>
      <Form onSubmit={handleSearch}>
        <fieldset>
          <Form.Group>
            <Form.Label>Type:</Form.Label>
            <Form.Control name="input" type="search" defaultValue={input} />
            <Button type="submit">Search</Button>
          </Form.Group>
        </fieldset>
      </Form>
      {status === "loading" ? (
        <progress />
      ) : (
        <>
          <p>{input}</p>
          <hr></hr>
          <p>{results}</p>
        </>
      )}
    </>
  );
}

export default Search;
