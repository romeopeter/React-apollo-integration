import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {AUTH_TOKEN} from "./constants";
import App from "./components/App";
import "./styles/index.css";

const httpLink = createHttpLink({ uri: "http://localhost:4000/", credentials: "same-origin" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };
});

/*Instantiates Apollo client and connect to GraphQL server.
This will take the server link and an instantiation of the cache funtionality*/
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);