export async function fetchRandomPokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  const data = await response.json();
  
  return await Promise.all(data.results.map(async (pokemon: any) => {
      const pokemonDetails = await fetch(pokemon.url);
      return await pokemonDetails.json(); 
  }));
}