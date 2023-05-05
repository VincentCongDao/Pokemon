import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { debounce } from "lodash";
const GlobalContext = createContext();
// actions
const LOADING = "LOADING";
const getPokemon = "GET_POKEMON";
const getAllPokemon = "GET_ALL_POKEMON";
const getSearch = "GET_SEARCH";
const updatePokemonSearch = "GET_POKEMON_DATABASE";
const next = "NEXT";
// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };

    case getAllPokemon:
      return {
        ...state,
        allPokemon: action.payload.results,
        next: action.payload.next,
        loading: false,
      };

    case getPokemon:
      return { ...state, pokemon: action.payload, loading: false };

    case getSearch:
      return { ...state, searchResults: action.payload, loading: false };

    case updatePokemonSearch:
      return { ...state, pokemonDatabase: action.payload, loading: false };

    case next:
      return {
        ...state,
        allPokemon: [...state.allPokemon, ...action.payload.results],
        next: action.payload.next,
        loading: false,
      };
  }
  return state;
};
export const GlobalProvider = ({ children }) => {
  //base URL
  const baseURL = "https://pokeapi.co/api/v2/";
  const initState = {
    allPokemon: [],
    pokemon: {},
    searchResults: [],
    pokemonDatabase: [],
    next: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initState);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const allPokemon = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${baseURL}pokemon?limit=20`);
    const data = await res.json();
    dispatch({ type: "GET_ALL_POKEMON", payload: data });

    const allPokemonData = [];
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      allPokemonData.push(pokemonData);
    }
    setAllPokemonData(allPokemonData);
  };

  //get Pokemon
  const getPokemon = async (name) => {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${baseURL}pokemon/${name}`);
    const data = await res.json();
    dispatch({ type: "GET_POKEMON", payload: data });
  };

  //next page
  const next = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(state.next);
    const data = await res.json();
    dispatch({ type: "NEXT", payload: data });

    //fetch the new pokemon data
    const newPokemonData = [];
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      newPokemonData.push(pokemonData);
    }

    //add new pokemon data to the old pokemon data
    setAllPokemonData([...allPokemonData, ...newPokemonData]);
  };
  //search the pokemon
  const getPokemonDatabase = async () => {
    dispatch({ type: "LOADING" });

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    console.log(data);
    dispatch({ type: "GET_POKEMON_DATABASE", payload: data.results });
  };
  //create a real time search
  const realTimeSearch = async (search) => {
    dispatch({ type: "LOADING" });
    // now time to search for pokemon in the database
    const res = state.pokemonDatabase.filter((pokemon) => {
      return pokemon.name.includes(search.toLowerCase());
    });

    console.log(search);
    dispatch({ type: "GET_SEARCH", payload: res });
    console.log(res);
  };

  useEffect(() => {
    getPokemonDatabase();
    allPokemon();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        realTimeSearch,
        allPokemonData,
        getPokemon,
        next,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
