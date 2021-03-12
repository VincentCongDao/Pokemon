import gql from "graphql-tag";

export const GET_POKEMON = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      types
      maxHP
      maxCP
      weaknesses
      attacks {
        special {
          name
          damage
        }
      }
    }
  }
`;
