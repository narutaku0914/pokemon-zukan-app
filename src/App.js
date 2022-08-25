import "./App.css";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/";

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemondata] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

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
      console.log(res);
      setPrevUrl(res.previous);
      setNextUrl(res.next);
      setLoading(false);
    };
    fetchPokemondata();
  }, []);

  const handlePrevPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setPrevUrl(data.previous);
    setNextUrl(data.next);
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setPrevUrl(data.previous);
    setNextUrl(data.next);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
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
            {prevUrl && <button onClick={handlePrevPage}>前へ</button>}
            <button onClick={handleNextPage}>次へ</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
