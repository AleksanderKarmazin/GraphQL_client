import React from 'react';
import App from './App'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://serene-shelf-18020.herokuapp.com/',
});

// const authLink = setContext(()=>{
//     const token = localStorage.getItem("jwtToken")
//     return{
//         header:{
//             Authorization: token ? `Bearer ${token}`:''
//         }
//     }
// })


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwtToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // typePolicies: {
    //   Post: {
    //     fields: {
    //       getPosts: {
    //         merge(existing, incoming) {
    //           // Equivalent to what happens if there is no custom merge function.
    //           return incoming;
    //         }
    //       }
    //     }
    //   }
    // }
  }),
  connectToDevTools: true
  
});





// const client = new ApolloClient({
//     uri: 'http://localhost:4000/',
//     cache: new InMemoryCache(),
//     connectToDevTools: true,

// });



export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)