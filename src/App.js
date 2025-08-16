import './styles/global.css';
import "./App.css";
import pokemonData from "./pokemonapi.json";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonModal from "./components/PokemonModal/PokemonModal";
import Footer from "./components/Footer/Footer";

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
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main>
        <PokemonModal 
          pokemon={selectedPokemon}
          loading={loading}
          error={error}
          onClose={closeModal}
        />

        <PokemonList 
          pokemonList={filteredPokemonList}
          onPokemonSelect={showPokemon}
          searchTerm={searchTerm}
          onClearSearch={() => setSearchTerm('')}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
