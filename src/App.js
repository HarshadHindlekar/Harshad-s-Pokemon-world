import logo from "./logo.png";
import "./App.css";
import pokemonData from "./pokemonapi.json";
import React, { useState, useEffect } from "react";

function App() {
  const [pokemonList] = useState(pokemonData.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add index to each pokemon for staggered animations
  const filteredPokemonList = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((pokemon, index) => ({
      ...pokemon,
      index
    }));

  const showPokemon = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching Pokemon: ${response.statusText}`);
      }
      const data = await response.json();
      setSelectedPokemon(data);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } catch (err) {
      console.error(err);
      setError('Failed to load Pokémon details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setSearchTerm("");
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedPokemon) {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPokemon]);

  return (
    <div className="App">
      <header className="pokemon-header">
        <img 
          alt="Pokemon Logo" 
          className="pokemon-logo" 
          src={logo} 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        />
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search for a Pokémon..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search Pokémon"
          />
        </div>
      </header>
      

      <main>
        {selectedPokemon && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button 
                className="close-button" 
                onClick={closeModal}
                aria-label="Close"
              >
                &times;
              </button>
              
              {loading ? (
                <div className="loading">Loading...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <>
                  <div className="pokemon-details">
                    <h2>{selectedPokemon.name}</h2>
                    <img 
                      className="pokemon-img"
                      src={selectedPokemon.sprites.other['official-artwork'].front_default || 
                           selectedPokemon.sprites.front_default}
                      alt={selectedPokemon.name}
                      loading="lazy"
                    />
                    
                    <div className="stats-container">
                      <div className="stat-item">
                        <div className="stat-name">Height</div>
                        <div className="stat-value">
                          {selectedPokemon.height / 10} m
                        </div>
                      </div>
                      
                      <div className="stat-item">
                        <div className="stat-name">Weight</div>
                        <div className="stat-value">
                          {selectedPokemon.weight / 10} kg
                        </div>
                      </div>
                      
                      {selectedPokemon.stats.map((stat, index) => (
                        <div className="stat-item" key={index}>
                          <div className="stat-name">
                            {stat.stat.name.replace('-', ' ')}
                          </div>
                          <div className="stat-value">
                            {stat.base_stat}
                            <div className="stat-bar" style={{
                              width: `${(stat.base_stat / 255) * 100}%`,
                              height: '4px',
                              background: `linear-gradient(90deg, var(--neon-blue), var(--neon-pink))`,
                              marginTop: '5px',
                              borderRadius: '2px'
                            }}></div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="stat-item" style={{ gridColumn: '1 / -1' }}>
                        <div className="stat-name">Types</div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {selectedPokemon.types.map((type, i) => (
                            <span 
                              key={i}
                              className="type-tag"
                              style={{
                                background: `var(--type-${type.type.name})`,
                                padding: '4px 12px',
                                borderRadius: '15px',
                                fontSize: '0.9rem',
                                color: 'white',
                                textShadow: '0 0 5px rgba(0,0,0,0.5)'
                              }}
                            >
                              {type.type.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {filteredPokemonList.length === 0 ? (
          <div className="no-results">
            <p>No Pokémon found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="reset-button"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <ul className={filteredPokemonList.length < 9 ? 'pokemon-item-less' : ""}>
            {filteredPokemonList.map((pokemon) => (
              <li 
                key={pokemon.id} 
                className="pokemon-item"
                style={{ '--i': pokemon.index % 10 }}
              >
                <button 
                  className='pokemon-item-a' 
                  onClick={(e) => {
                    e.preventDefault();
                    showPokemon(pokemon.url);
                  }}
                >
                  <span style={{ 
                    textTransform: 'capitalize',
                    fontWeight: '500',
                    letterSpacing: '1px'
                  }}>
                    {pokemon.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
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
