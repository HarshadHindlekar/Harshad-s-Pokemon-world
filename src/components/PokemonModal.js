import React from 'react';

const PokemonModal = ({ pokemon, loading, error, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="pokemon-details">
            <h2>{pokemon.name}</h2>
            <img 
              className="pokemon-img"
              src={pokemon.sprites.other['official-artwork'].front_default || 
                   pokemon.sprites.front_default}
              alt={pokemon.name}
              loading="lazy"
            />
            
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-name">Height</div>
                <div className="stat-value">
                  {pokemon.height / 10} m
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-name">Weight</div>
                <div className="stat-value">
                  {pokemon.weight / 10} kg
                </div>
              </div>
              
              {pokemon.stats.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <div className="stat-name">
                    {stat.stat.name.replace('-', ' ')}
                  </div>
                  <div className="stat-value">
                    {stat.base_stat}
                    <div className="stat-bar" style={{
                      width: `${(stat.base_stat / 255) * 100}%`,
                      height: '4px',
                      background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-pink))',
                      marginTop: '5px',
                      borderRadius: '2px'
                    }}></div>
                  </div>
                </div>
              ))}
              
              <div className="stat-item" style={{ gridColumn: '1 / -1' }}>
                <div className="stat-name">Types</div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {pokemon.types.map((type, i) => (
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
        )}
      </div>
    </div>
  );
};

export default PokemonModal;
