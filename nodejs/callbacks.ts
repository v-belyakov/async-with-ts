import fetch from "node-fetch";

export interface PokemonList {
  count: number;
  next: string;
  previous: any;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

// export const getPokemonList = (
//   cb: (err: Error | undefined, pokemonList?: PokemonList | undefined) => void
// ): void => {
//   fetch("https://pokeapi.co/api/v2/pokemon")
//     .then((response) => response.json())
//     .then((data) => cb(undefined, data));
// };

function getPokemonList(
  cb: (err: Error | undefined, pokemonList?: PokemonList | undefined) => void
): void;

function getPokemonList(
): Promise<PokemonList>;

function getPokemonList(
  cb?: (err: Error | undefined, pokemonList?: PokemonList | undefined) => void
): Promise<PokemonList> | void {
  if (cb) {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => cb(undefined, data));
    return undefined;
  } else {
    return fetch("https://pokeapi.co/api/v2/pokemon").then((response) =>
      response.json()
    );
  }
}

getPokemonList((_err, data) => {
  console.log(data?.results.length);
});

(async function() {
  const data = await getPokemonList();
  console.log(data?.results.length);
})()
