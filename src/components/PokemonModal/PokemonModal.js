import React from 'react';
import './PokemonModal.css';
import Modal from '../Modal/Modal';

const PokemonModal = ({ pokemon, loading, error, onClose }) => {
  if (!pokemon) return null;

  return (
    <Modal 
      isOpen={!!pokemon} 
      onClose={onClose} 
      title={pokemon?.name}
      className="pokemon-modal"
    >
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="pokemon-details">
          <div className="pokemon-header">
            <img 
              className="pokemon-img"
              src={pokemon.sprites.other['official-artwork'].front_default || 
                   pokemon.sprites.front_default}
              alt={pokemon.name}
              loading="lazy"
            />
            <div className="pokemon-basic-info">
              <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
              <p>Base Experience: {pokemon.base_experience || 'N/A'}</p>
              <p>Height: {pokemon.height / 10} m</p>
              <p>Weight: {pokemon.weight / 10} kg</p>
              <div className="types">
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
                      textShadow: '0 0 5px rgba(0,0,0,0.5)',
                      marginRight: '5px'
                    }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pokemon-sections">
            {/* Abilities Section */}
            <div className="section">
              <h3>Abilities</h3>
              <div className="abilities">
                {pokemon.abilities.map((ability, index) => (
                  <div key={index} className="ability">
                    <span>{ability.ability.name.replace('-', ' ')}</span>
                    {ability.is_hidden && <span className="hidden-ability">(Hidden)</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="section">
              <h3>Base Stats</h3>
              <div className="stats-container">
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
              </div>
            </div>

            {/* Game Indices Section */}
            {pokemon.game_indices && pokemon.game_indices.length > 0 && (
              <div className="section">
                <h3>Game Appearances</h3>
                <div className="game-indices">
                  {pokemon.game_indices.slice(0, 10).map((game, index) => (
                    <span key={index} className="game-tag">
                      {game.version.name}
                    </span>
                  ))}
                  {pokemon.game_indices.length > 10 && (
                    <span className="more-games">+{pokemon.game_indices.length - 10} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Moves Section */}
            {pokemon.moves && pokemon.moves.length > 0 && (
              <div className="section">
                <h3>Known Moves</h3>
                <div className="moves">
                  {pokemon.moves.slice(0, 10).map((move, index) => (
                    <span key={index} className="move-tag">
                      {move.move.name.replace('-', ' ')}
                    </span>
                  ))}
                  {pokemon.moves.length > 10 && (
                    <span className="more-moves">+{pokemon.moves.length - 10} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Cries Section */}
            {pokemon.cries && (
              <div className="section">
                <h3>Cries</h3>
                <div className="cries">
                  {pokemon.cries.latest && (
                    <audio controls>
                      <source src={pokemon.cries.latest} type="audio/ogg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PokemonModal;
