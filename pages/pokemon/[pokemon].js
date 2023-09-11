import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Pokemon.module.css";
import Loading from "@/pages/Components/Loading";
import Router from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
function Pokemon() {
  const router = useRouter();
  const { pokemon } = router.query;
  const {
    getPokemon,
    loading,
    pokemon: pokemonItem,
    searchResults,
    realTimeSearch,
  } = useGlobalContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (pokemon) {
      getPokemon(pokemon);
    }
  }, [pokemon]);

  let linkEmmet = "";
  if (pokemonItem?.sprites?.other) {
    const { "official-artwork": link } = pokemonItem?.sprites?.other;
    linkEmmet = link.front_default;
  }
  const pkColors = [
    "#f8d5a3",
    "#f5b7b1",
    "#c39bd3",
    "#aed6f1",
    "#a3e4d7",
    "#f9e79f",
    "#fadbd8",
    "#d2b4de",
    "#a9cce3",
    "#a2d9ce",
    "#f7dc6f",
    "#f5cba7",
    "#bb8fce",
    "#85c1e9",
    "#76d7c4",
  ];

  const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];
  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };
  const handleChange = (e) => {
    const search = e.target.value;
    setSearch(search);
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
      <div
        className={styles.PokemonBg}
        style={{
          background: !loading && randomColor,
        }}
      >
        {!loading ? (
          pokemonItem && (
            <>
              <div className={styles.PokemonImage}>
                <img
                  src={
                    pokemonItem?.sprites?.other?.home.front_default
                      ? pokemonItem?.sprites?.other?.home.front_default
                      : linkEmmet
                  }
                  alt={pokemonItem?.name}
                />
              </div>
              <div className={styles.PokemonBody}>
                <h2>{pokemonItem?.name}</h2>
                <div className={styles.PokemonInfo}>
                  <div className={styles.PokemonInfoItem}>
                    <h5>Name:</h5>
                    <p>{pokemonItem?.name}</p>
                  </div>

                  <div className={styles.PokemonInfoItem}>
                    <h5>Type:</h5>
                    {pokemonItem?.types?.map((type) => {
                      return <p key={type.type.name}>{type.type.name}</p>;
                    })}
                  </div>

                  <div className={styles.PokemonInfoItem}>
                    <h5>Abilities:</h5>
                    <ul>
                      {pokemonItem?.abilities?.map((ability) => {
                        return (
                          <li key={ability.ability.name}>
                            {ability.ability.name}
                          </li>
                        );
                      })}{" "}
                    </ul>
                  </div>

                  <div className={styles.PokemonInfoItem}>
                    <h5>Stats:</h5>
                    <ul>
                      {pokemonItem?.stats?.map((stat) => {
                        return (
                          <li key={stat.stat.name}>
                            {stat.base_stat} {stat.stat.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className={styles.PokemonInfoItem}>
                    <h5>Move sets:</h5>
                    <ul>
                      {pokemonItem?.moves?.slice(0, 3).map((move) => {
                        return <li key={move.move.name}> {move.move.name}</li>;
                      })}{" "}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )
        ) : (
          <div className="loader">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
export default Pokemon;
