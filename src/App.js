import "./App.css";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";

function App() {
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/";

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemondata] = useState([]);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemondata(_pokemonData);
  };

  useEffect(() => {
    const fetchPokemondata = async () => {
      let res = await getAllPokemon(initialUrl);
      loadPokemon(res.results);
      // console.log(res.results);
      setLoading(false);
    };
    fetchPokemondata();
  }, []);

  console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中...</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
