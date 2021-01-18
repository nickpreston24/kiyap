// Src: https://strapi.io/blog/nextjs-react-hooks-strapi-restaurants-2
// import { HttpLink } from "apollo-link-http";
// import withData from 'next-apollo/dist/withData'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

// const config = {
//     link: new HttpLink({
//         uri: `${API_URL}/graphql`, // Server URL (must be absolute)
//     })
// };


import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: `${API_URL}/graphql`, // Server URL (must be absolute)
    cache: new InMemoryCache(),
});

export default withApollo(apolloClient);