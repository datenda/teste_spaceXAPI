import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://spacex-production.up.railway.app/",
    fetch,
  }),
  cache: new InMemoryCache(),
});
