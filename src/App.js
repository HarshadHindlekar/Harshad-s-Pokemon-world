import logo from "./logo.png";
import "./App.css";
import pokemonData from "./pokemonapi.json";
import React, { useState } from "react";

function App() {
  const [pokemonList] = useState(pokemonData.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  const showPokemon = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching Pokemon: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    setSelectedPokemon(data);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setSearchTerm("");
  };

  return (
    <div className="App">
      <header className="pokemon-header">
        <img alt="react logo" className="pokemon-logo" src={logo} />
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </header>

      <main>

        {selectedPokemon && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h2>{selectedPokemon.name}</h2>
              <img className="pokemon-img"
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
              <p>Height: {selectedPokemon.height}</p>
              <p>Weight: {selectedPokemon.weight}</p>

              {selectedPokemon.stats.map((stat, index) => (
                <div key={index}>
                  <p>
                    {stat.stat.name}: {stat.base_stat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <ul className={filteredPokemonList.length < 9 ? 'pokemon-item-less' : ""}>
          {filteredPokemonList.map((pokemon) => (
            <li key={pokemon.id} className="pokemon-item">
              <a className='pokemon-item-a' href="#" onClick={() => showPokemon(pokemon.url)}>
                {pokemon.name}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <div class="frame">
          <h1 class="frame__title">Harshad's Pokemon World</h1>
          <span class="frame__credits">Copyright 2024.<br /> All Rights Reserved By <a href="https://harshad-portfolio.vercel.app/">Harshad Hindlekar</a></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
