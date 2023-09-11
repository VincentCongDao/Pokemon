import React, { useEffect } from "react";
import { useGlobalContext } from "@/context/global";
import modalstyle from "@/styles/Modal.module.css";
import styles from "@/styles/Pokemon.module.css";
import { useRouter } from "next/router";
import Router from "next/router";

function Modal(props) {
  const { showModal, setShowModal } = props;
  const router = useRouter();
  const { pokemon } = router.query;
  const {
    getPokemon,
    loading,
    pokemon: pokemonItem,
    allPokemonData,
    searchResults,
    next: fetchNext,
    realTimeSearch,
  } = useGlobalContext();

  useEffect(() => {
    if (pokemon) {
      getPokemon(pokemon);
    }
  }, [pokemon]);

  let linkEmmet = "";
  console.log(pokemonItem);
  if (pokemonItem?.sprites?.other) {
    const { "official-artwork": link } = pokemonItem?.sprites?.other;
    linkEmmet = link.front_default;
  }

  return (
    <>
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
      <div className={modalstyle.modal}>
        {!loading ? (
          pokemonItem && (
            <>
              <div className={modalstyle.modalButtonContainer}>
                <button
                  className={modalstyle.modalbutton}
                  onClick={() => setShowModal(false)}
                >
                  &#8592; Back
                </button>
                <button
                  className={modalstyle.modalbutton}
                  key={pokemonItem.url}
                  onClick={() => {
                    Router.push(`/pokemon/${pokemonItem.name}`);
                  }}
                >
                  Individual Page
                </button>
              </div>
              <div className={styles.PokemonImage}>
                <img
                  src={
                    pokemonItem?.sprites?.other?.home.front_default
                      ? pokemonItem?.sprites?.other?.home.front_default
                      : linkEmmet
                  }
                  alt={pokemonItem.name}
                />
              </div>
              <div className={styles.PokemonBody}>
                <h2>{pokemonItem?.name}</h2>
                <div className={styles.PokemonInfo}>
                  <div className={styles.PokemonInfoItem}>
                    <p>{pokemonItem?.name}</p>
                    <h5>Name:</h5>
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
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}

export default Modal;
