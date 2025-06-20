document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('loadPokemonBtn');
    const display = document.getElementById('pokemonDisplay');

    async function fetchRandomPokemon() {
        const maxPokemon = 1010; // Número actual de Pokémon en la PokéAPI
        const randomId = Math.floor(Math.random() * maxPokemon) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

        display.innerHTML = '<p>Cargando...</p>';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('No se pudo obtener el Pokémon');
            const data = await response.json();

            const name = data.name;
            const img = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

            display.innerHTML = `
                <img src="${img}" alt="${name}">
                <h2>${name}</h2>
            `;
        } catch (error) {
            display.innerHTML = `<p style="color: #D32D2F;">Error al cargar el Pokémon. Intenta de nuevo.</p>`;
        }
    }

    btn.addEventListener('click', fetchRandomPokemon);
});
