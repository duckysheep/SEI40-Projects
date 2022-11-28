import itemData from "../assets/data/itemdata";

function Home() {
  const temp = itemData.results["Steel bar"].printouts["Production JSON"][0];

  console.log("temp", temp);

  return (
    <>
      <h1>Home</h1>
      <p>
        Calculator to help calculate RS crafting costs with real time Grand
        Exchange data
      </p>
      <p>{temp}</p>
    </>
  );
}

export default Home;
