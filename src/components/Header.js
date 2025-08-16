import React from 'react';
import logo from "../logo.png";

const Header = ({ searchTerm, onSearchChange }) => {
  return (
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
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search Pokémon"
        />
      </div>
    </header>
  );
};

export default Header;
