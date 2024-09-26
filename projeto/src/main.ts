import { fetchRandomPokemon } from './utils/pokemons';

class PokemonCard extends HTMLElement {
  static get observedAttributes() {
      return ['name', 'image'];
  }

  constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });

      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const style = document.createElement('style');
      style.textContent = `
          .card {
            
              width: 150px;
              height: 180px;
              border: 1px solid #ccc;
              border-radius: 8px;
              padding: 10px;
              text-align: center;
              background-color: #fff;
          }
          img {
              width: 100px;
              height: auto;
          }
      `;

      shadow.appendChild(style);
      shadow.appendChild(card);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      const card = this.shadowRoot?.querySelector('.card');
      if (card) {
          if (name === 'name') {
              card.querySelector('h2')!.textContent = newValue || '';
          } else if (name === 'image') {
              const img = card.querySelector('img');
              if (img) {
                  img.src = newValue || '';
                  img.alt = newValue ? newValue : '';
              }
          }
      }
  }
}

customElements.define('pokemon-card', PokemonCard);

fetchRandomPokemon().then(pokemons => {
  console.log(pokemons); 
  const playerA = document.getElementById('playerA');
  const playerB = document.getElementById('playerB');

  if (playerA && playerB) {
      pokemons.forEach(pokemon => {
          console.log(pokemon); // Verifique cada Pokémon
          const card = document.createElement('pokemon-card');
          card.setAttribute('name', pokemon.name);
          card.setAttribute('image', pokemon.sprites.front_default);
          playerA.appendChild(card);
      });
  } else {
      console.error("Um dos elementos do jogador não foi encontrado.");
  }
}).catch(error => {
  console.error("Erro ao buscar Pokémon:", error);
});