import { PromisePool } from "@supercharge/promise-pool";
import { getPokemon, getPokemonList } from "./src/getPokemon";

(async function () {
  try {
    const list = await getPokemonList();

    // for(const listItem of list.results.slice(0, 10)) {
    //   console.log("Getting pokemon...");
    //   const pokemon = await getPokemon(listItem.url);
    //   console.log(pokemon.name);
    // }

    // list.results.reduce<Promise<unknown>>(async(promise, pokemon) => {
    //   await promise;
    //   return getPokemon(pokemon.url).then((pokemon) => console.log(pokemon.name));
    // }, Promise.resolve(undefined));

    // const data = await Promise.all(
    //   list.results.slice(0, 5).map((pokemon) => getPokemon(pokemon.url))
    // );

    const { results, errors } = await PromisePool.withConcurrency(2)
      .for(list.results)
      .process(async (data) => {
        return await getPokemon(data.url);
      });

    console.log(results.map((pokemon) => pokemon.name));
  } catch (error) {
    console.log(error);
  }
})();
