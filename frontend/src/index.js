import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  inMemoryCache,
} from "@apollo/client";

/*Instantiates Apollo client and connect to GraphQL server.
This will take in the server link and an instantiation of the cache funtionalities*/
const client = new ApolloClient({
  link: createHttpLink({uri: "localhost:4000"}),
  cache: new inMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ApolloProvider>
  document.getElementById("root")
);