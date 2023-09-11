import { useGlobalContext } from "@/context/global";
import Router from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const {
    allPokemonData,
    searchResults,
    getPokemon,
    next: fetchNext,
    loading,
    realTimeSearch,
  } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Add this line

  const handleChange = (e) => {
    const search = e.target.value;
    setSearch(search);
    realTimeSearch(search);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const fetchMoreData = async () => {
    setIsLoadingMore(true); // Set loading state to true before fetching more data
    await fetchNext(); // Assuming next is an async function
    setIsLoadingMore(false); // Set loading state back to false after data is fetched
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

  const pkColors = [
    "#fff7de",
    "#f5b7b1",
    "#c39bd3",
    "#aed6f1",
    "#a3e4d7",
    "#f9e79f",
  ];

  const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];

  return (
    <>
      <main>
        <div className="navbar">
          <Link href="/">
            <Image
              src="/pokedex.png"
              width={150}
              height={50}
              alt="Pokemon Logo"
            />
          </Link>
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
        </div>
        <div className="allPokemon-container">
          {Array.isArray(allPokemonData) ? (
            allPokemonData.map((pokemon) => {
              return (
                <div
                  style={{
                    background: !loading && randomColor,
                  }}
                  key={pokemon.id}
                  className="allPokemon-card"
                  onClick={() => {
                    Router.push(`/pokemon/${pokemon.name}`);
                  }}
                >
                  {/* //     <div key={pokemon.id} className="allPokemon-card"> */}
                  <div className="allPokmeon-image">
                    <Image
                      src={pokemon.sprites.other.home.front_shiny}
                      alt={pokemon.name}
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="allPokemon-body">
                    <h3>{pokemon.name}</h3>
                    <p>Click To See Detail</p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </div>

        <div className="next">
          {allPokemonData.length > 0 && (
            <button onClick={fetchMoreData} className="Load-more">
              {isLoadingMore ? "Getting More Pokemon" : "Load More"}
            </button>
          )}
        </div>
      </main>
    </>
  );
}
