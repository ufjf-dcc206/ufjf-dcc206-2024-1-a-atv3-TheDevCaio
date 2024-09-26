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
                cursor: pointer;
            }
            img {
                width: 100px;
                height: auto;
            }
        `;

        const nameElement = document.createElement('h2');
        const imgElement = document.createElement('img');

        card.appendChild(nameElement);
        card.appendChild(imgElement);
        shadow.appendChild(style);
        shadow.appendChild(card);
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        const card = this.shadowRoot?.querySelector('.card');
        const nameElement = card?.querySelector('h2');
        const imgElement = card?.querySelector('img');

        if (nameElement && imgElement) {
            if (name === 'name') {
                nameElement.textContent = newValue || '';
            } else if (name === 'image') {
                imgElement.src = newValue || '';
                imgElement.alt = newValue ? newValue : '';
            }
        }
    }
}

customElements.define('pokemon-card', PokemonCard);

fetchRandomPokemon().then(pokemons => {
    const playerA = document.getElementById('playerA');
    const playerB = document.getElementById('playerB');
    const playAreaA = document.getElementById('play-areaA');
    const playAreaB = document.getElementById('play-areaB');

    if (playerA && playerB && playAreaA && playAreaB) {
        const half = Math.ceil(pokemons.length / 2);
        const playerAPokemons = pokemons.slice(0, half);
        const playerBPokemons = pokemons.slice(half);

        playerAPokemons.forEach(pokemon => {
            playerA.appendChild(createPokemonCard(pokemon, 'A'));
        });

        playerBPokemons.forEach(pokemon => {
            playerB.appendChild(createPokemonCard(pokemon, 'B'));
        });
    }
}).catch(error => {
    console.error("Erro ao buscar Pokémon:", error);
});

function createPokemonCard(pokemon: any, player: string) {
    const card = document.createElement('pokemon-card');
    card.setAttribute('name', pokemon.name);
    card.setAttribute('image', pokemon.sprites.front_default);
    card.setAttribute('data-player', player);

    card.addEventListener('click', () => {
        const playArea = player === 'A' ? document.getElementById('play-areaA') : document.getElementById('play-areaB');
        if (playArea) {
            const clonedCard = card.cloneNode(true);
            playArea.appendChild(clonedCard);
            card.remove();
        }
    });

    return card;
}
