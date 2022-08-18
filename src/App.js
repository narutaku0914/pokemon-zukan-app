import "./App.css";
import { useEffect } from "react";
import { getAllPokemon } from "./utils/pokemon";

function App() {
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    const fetchPokemondata = async () => {
      let res = await getAllPokemon(initialUrl);
      console.log(res);
    };
    fetchPokemondata();
  }, []);

  return <div className="App"></div>;
}

export default App;
