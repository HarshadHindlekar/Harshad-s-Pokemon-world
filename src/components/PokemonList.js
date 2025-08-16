import React from 'react';

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
    <ul className={pokemonList.length < 9 ? 'pokemon-item-less' : ""}>
      {pokemonList.map((pokemon) => (
        <li 
          key={pokemon.id} 
          className="pokemon-item"
          style={{ '--i': pokemon.index % 10 }}
        >
          <button 
            className='pokemon-item-a' 
            onClick={(e) => {
              e.preventDefault();
              onPokemonSelect(pokemon.url);
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
  );
};

export default PokemonList;
