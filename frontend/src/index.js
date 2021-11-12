import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

/*Instantiates Apollo client and connect to GraphQL server.
This will take in the server link and an instantiation of the cache funtionalities*/
const client = new ApolloClient({
  link: createHttpLink({uri: "http://localhost:4000"}),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);