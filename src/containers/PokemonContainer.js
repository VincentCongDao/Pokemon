import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMON } from "../graphql/get-pokemon";
import Pokemon from "../comp/Pokemon";
export default function PokemonContainer() {
  const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMON, {
    variables: { first: 10 },
  });

  return (
    <PokemonSectionContainer>
      {pokemons &&
        pokemons.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
    </PokemonSectionContainer>
  );
}

const PokemonSectionContainer = styled.div`
  display: flex;
  max-width: 800px;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) and (min-width: 400px) {
    width: 100%;
    display: inline;
  }
`;
