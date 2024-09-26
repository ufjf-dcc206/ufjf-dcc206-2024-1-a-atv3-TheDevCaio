import { fetchRandomPokemon } from './utils/pokemons';

class PokemonCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const name = this.getAttribute('name');
        const image = this.getAttribute('image');

        card.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${name}" />
        `;

        const style = document.createElement('style');
        style.textContent = `
            .card {
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
}


customElements.define('pokemon-card', PokemonCard);

fetchRandomPokemon().then(pokemons => {
    console.log(pokemons); 
    const playerA = document.getElementById('playerA');
    const playerB = document.getElementById('playerB');

    if (playerA && playerB) {
        pokemons.forEach(pokemon => {
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