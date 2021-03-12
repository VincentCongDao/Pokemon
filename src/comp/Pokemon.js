import React from "react";

import styled from "styled-components";
export default function Pokemon({ pokemon }) {
  return (
    <PokemonContainer>
      <TopContainer>
        <PokemonName>{pokemon.name}</PokemonName>
        <PokemonType>Type: {pokemon.types + " "}</PokemonType>
        <PokemonImage src={pokemon.image}></PokemonImage>
        <PokemonMeta>
          HP: {pokemon.maxHP} || CP: {pokemon.maxCP}
        </PokemonMeta>
        <PokemonWeaknesses>
          Weak To: {pokemon.weaknesses + " "}
        </PokemonWeaknesses>
      </TopContainer>
      <BottomContainer>
        <PokemonAttackContainer>
          {pokemon &&
            pokemon.attacks &&
            pokemon.attacks.special
              .slice(0, 3)
              .map((attack) => (
                <PokemonAttack key={`${attack.name} - ${attack.damage}}`}>
                  Attack Abilities: {attack.name}
                </PokemonAttack>
              ))}
        </PokemonAttackContainer>
      </BottomContainer>
    </PokemonContainer>
  );
}

const PokemonContainer = styled.div`
  width: 49%;
  background: linear-gradient(
    90deg,
    rgba(250, 192, 204, 1) 0%,
    rgba(241, 174, 198, 1) 29%,
    rgba(232, 243, 226, 1) 79%,
    rgba(196, 214, 217, 1) 100%
  );
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1em;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.075);
  overflow: hidden;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const TopContainer = styled.div``;
const BottomContainer = styled.div``;
const PokemonName = styled.h3`
  margin: 0;
  background-color: #ffffdb99;
  padding: 10px;
`;
const PokemonMeta = styled.h4``;
const PokemonImage = styled.img``;
const PokemonWeaknesses = styled.p`
  font-size: 18px;
  color: black;
  text-shadow: 1px 0px 2px rgb(156 156 156);
`;
const PokemonAttackContainer = styled.div``;
const PokemonAttack = styled.div`
  padding: 10px 0;
  background-color: #ff000029;
`;
const PokemonType = styled.h4``;
