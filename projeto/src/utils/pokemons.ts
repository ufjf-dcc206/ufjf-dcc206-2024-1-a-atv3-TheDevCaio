export async function fetchRandomPokemon() {
    const pokemonIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 898) + 1);
    const promises = pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()));
    return Promise.all(promises);
  }