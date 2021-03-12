import styled from "styled-components";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import PokemonContainer from "./containers/PokemonContainer";
function App() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
  });
  return (
    <AppContainer>
      <ApolloProvider client={client}>
        <AppMain>
          <PokemonContainer />
        </AppMain>
      </ApolloProvider>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  margin: 20px 5px;
  padding: 0 20px;
  line-height: 1;
  font-family: "Roboto", sans-serif;
  color: #202020;
  background-color: #fbfbfb;
`;
const AppMain = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    display: inline-block;
  }
`;
