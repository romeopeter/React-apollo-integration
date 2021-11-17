import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AUTH_TOKEN from "./constants";
import App from "./components/App";
import "./styles/index.css";

const httpLink = createHttpLink({ uri: "http://localhost:4000" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };
});

/*Instantiates Apollo client and connect to GraphQL server.
This will take in the server link and an instantiation of the cache funtionalities*/
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);