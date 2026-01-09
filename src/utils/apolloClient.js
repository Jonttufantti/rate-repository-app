import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: "http://10.0.2.2:4000" }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
