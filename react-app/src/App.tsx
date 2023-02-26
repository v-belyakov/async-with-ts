import "./App.css";
import React, { useEffect, useState } from "react";
import { PromisePool } from "@supercharge/promise-pool";
import { getPokemon, getPokemonList, Pokemon } from "./getPokemon";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function getPokemons() {
      const list = await getPokemonList();
      const { results } = await PromisePool.withConcurrency(2)
        .for(list.results)
        .process(async (data) => {
          return await getPokemon(data.url);
        });

      setPokemons(results);
    }

    getPokemons();
  }, []);
  return (
    <div className="App">
      <ul>
        {pokemons.map((pokemon) => {
          return <li key={pokemon.id}>{pokemon.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
