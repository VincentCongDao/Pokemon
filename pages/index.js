import { useGlobalContext } from "@/context/global";
import Router from "next/router";
import { useState } from "react";
import Modal from "./modal";

export default function Home() {
  const {
    allPokemonData,
    searchResults,
    getPokemon,
    next,
    loading,
    realTimeSearch,
  } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    const search = e.target.value;
    setSearch(search);
    realTimeSearch(search);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };
  const displaySearchResults = () => {
    return searchResults.map((pokemon) => {
      return (
        <div
          className="pokemonsearch-results"
          key={pokemon.url}
          onClick={() => {
            Router.push(`/pokemon/${pokemon.name}`);
          }}
        >
          {pokemon.name}
        </div>
      );
    });
  };
  return (
    <>
      <main>
        <form action="" className="search-form" onSubmit={handleSearch}>
          <div className="input-control">
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search For Pokemon ..."
            />
            <button className="submit-btn" type="submit">
              Search
            </button>
          </div>
        </form>
        {search && searchResults.length > 0 && (
          <div className="search-results">{displaySearchResults()}</div>
        )}
        <div className="allPokemon-container">
          {Array.isArray(allPokemonData) ? (
            allPokemonData.map((pokemon) => {
              console.log(allPokemonData);
              return (
                <div
                  key={pokemon.id}
                  className="allPokemon-card"
                  onClick={() => {
                    Router.push(`/pokemon/${pokemon.name}`);
                  }}
                >
                  {/* //     <div key={pokemon.id} className="allPokemon-card"> */}
                  <div className="allPokmeon-image">
                    <img
                      src={pokemon.sprites.other.home.front_shiny}
                      alt={pokemon.name}
                    />
                  </div>
                  <div className="allPokemon-body">
                    <h3>{pokemon.name}</h3>
                    <p>More Detail</p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        )}
        <div className="next">
          {allPokemonData.length > 0 && (
            <button onClick={next} className="Load-more">
              Load More &darr;
            </button>
          )}
        </div>
      </main>
    </>
  );
}
