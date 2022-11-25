import itemData from "../assets/data/itemdata";

function Home() {
  const temp =
    itemData.results["Amulet of glory"].printouts["Production JSON"][0];

  console.log("temp", temp);

  return (
    <>
      <h1>Home</h1>
      <p>
        Calculator to help calculate RS crafting costs with real time Grand
        Exchange date
      </p>
      <p>{temp}</p>
    </>
  );
}

export default Home;
