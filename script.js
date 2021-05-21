const pokemonsLimit = 150;

const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

const pokemonContainer = document.querySelector(".pokemon-container");

async function loadPokemons() {
    let pokemonsArr = [];

    for (let i = 1; i <= pokemonsLimit; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemons = await response.json();

        pokemonsArr.push(pokemons);
    }

    return pokemonsArr;
}

document.addEventListener("DOMContentLoaded", async () => {
    let pokemons = [];

    try {
        pokemons = await loadPokemons();
    } catch (e) {
        console.log("Error!");
        console.log(e);
    }

    // change pad pokemon id
    Number.prototype.pad = function (size) {
        var s = String(this);
        while (s.length < (size || 2)) {
            s = "0" + s;
        }
        return s;
    };

    for (let i = 0; i < pokemons.length; i++) {
        const pokemonEl = document.createElement("div");
        pokemonEl.classList.add("pokemon");

        const pokemonImg = pokemons[i].sprites.other.dream_world.front_default;
        let pokemonId = pokemons[i].id;
        let pokemonName = pokemons[i].name;
        const pokemonType = pokemons[i].types[0].type.name;

        pokemonId = pokemonId.pad(3);

        pokemonName =
            pokemons[i].name[0].toUpperCase() + pokemons[i].name.slice(1);

        const type = main_types.find((type) => pokemonType.indexOf(type) > -1);

        const color = colors[type];

        pokemonEl.style.backgroundColor = color;

        const generateHtml = `
                <div class="circle"></div>
                <img class="img" src=${pokemonImg}></img>
                <p class="id">#${pokemonId}</p>
                <h2 class="name">${pokemonName}</h2>
                <p class="type">Type: ${pokemonType}</p>

            `;

        pokemonEl.innerHTML = generateHtml;

        pokemonContainer.appendChild(pokemonEl);
    }
});
