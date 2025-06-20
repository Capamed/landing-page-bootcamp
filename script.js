document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('pokemonDisplay');
    const carousel = document.getElementById('pokemonCarousel');
    const leftBtn = document.getElementById('carouselLeft');
    const rightBtn = document.getElementById('carouselRight');

    // Cargar 15 Pokémon populares (IDs del 1 al 15, puedes cambiar el rango o IDs)
    const pokemonIds = Array.from({length: 15}, (_, i) => i + 1);
    let pokemons = [];

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

    fetchPokemons();
});
