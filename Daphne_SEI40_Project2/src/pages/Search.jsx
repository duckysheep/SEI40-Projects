import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [searchParams, setSearchParams] = useSearchParams();

  const input = searchParams.get("input");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const request = await fetch(
          `https://runescape.wiki/api.php?action=parse&format=json&page=${input}&redirects=1&prop=wikitext&formatversion=2`
        );
        if (!request.ok) {
          throw new Error("Network error");
        }
        const data = await request.json();

        // console.log(data.parse.wikitext);

        for (let i = 1; data.parse.wikitext.search(`mat${i}`) >= 0; i++) {
          console.log(
            i,
            data.parse.wikitext.search(`mat${i}`),
            data.parse.wikitext.search(`mat${i}price`),
            data.parse.wikitext.substring(
              data.parse.wikitext.search(`mat${i}`),
              data.parse.wikitext.search(`mat${i}price`) - 2
            )
          );
          setResults([
            ...results,
            data.parse.wikitext.substring(
              data.parse.wikitext.search(`mat${i}`),
              data.parse.wikitext.search(`mat${i}price`) - 2
            ),
          ]);
          // console.log(results);
        }

        // setResults(data?.parse?.wikitext);
        setStatus("done");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };
    setStatus("loading");
    fetchCards();
  }, [input]);

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // console.log("input", data);
    setSearchParams(data);
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
