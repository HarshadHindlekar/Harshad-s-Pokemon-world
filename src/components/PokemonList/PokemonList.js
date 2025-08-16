import React from 'react';
import './PokemonList.css';

const PokemonList = ({ pokemonList, onPokemonSelect, searchTerm, onClearSearch }) => {
  if (pokemonList.length === 0) {
    return (
      <div className="no-results">
        <p>No Pokémon found matching "{searchTerm}"</p>
        <button 
          onClick={onClearSearch}
          className="reset-button"
        >
          Clear Search
        </button>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {pokemonList.map((pokemon, index) => (
        <div 
          key={pokemon.id} 
          className="pokemon-card" 
          style={{ '--i': index % 6 }}
          data-animation-type={index % 3}
        >
          <button 
            className='pokemon-card-button' 
            onClick={(e) => {
              e.preventDefault();
              onPokemonSelect(pokemon.url);
            }}
          >
            <div className="pokemon-content">
              <span className="pokemon-name">
                {pokemon.name}
              </span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
