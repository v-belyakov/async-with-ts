import { getPokemonList } from "./getPokemon";

describe("getPokemon", () => {
  it("should return a pokemon", async () => {
    const list = await getPokemonList();
    console.log("Running test...");
    expect(list.results[0].name).toBe("bulbasaur");
  });
});
