document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('loadPokemonBtn');
    const display = document.getElementById('pokemonDisplay');
    const carousel = document.getElementById('pokemonCarousel');
    const leftBtn = document.getElementById('carouselLeft');
    const rightBtn = document.getElementById('carouselRight');

    // Cargar 15 Pokémon populares (IDs del 1 al 15, puedes cambiar el rango o IDs)
    const pokemonIds = Array.from({length: 15}, (_, i) => i + 1);
    let pokemons = [];

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

    async function fetchPokemons() {
        const promises = pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .catch(() => null));
        pokemons = await Promise.all(promises);
        renderCarousel();
        // Mostrar el primero por defecto
        if (pokemons[0]) showPokemon(pokemons[0]);
    }

    function renderCarousel() {
        carousel.innerHTML = '';
        pokemons.forEach(poke => {
            if (!poke) return;
            const pokeDiv = document.createElement('div');
            pokeDiv.className = 'carousel-pokemon';
            pokeDiv.innerHTML = `
                <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
                <span>${poke.name}</span>
            `;
            pokeDiv.addEventListener('click', () => showPokemon(poke));
            carousel.appendChild(pokeDiv);
        });
    }

    function showPokemon(poke) {
        display.innerHTML = `
            <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
            <h2>${poke.name}</h2>
            <p style="color:#ffde00;">Tipo: ${poke.types.map(t => t.type.name).join(', ')}</p>
            <p style="font-size:1rem;">Peso: ${poke.weight / 10} kg | Altura: ${poke.height / 10} m</p>
        `;
    }

    leftBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    btn.addEventListener('click', fetchRandomPokemon);
    fetchPokemons();
});
