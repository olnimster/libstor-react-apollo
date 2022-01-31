import React from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {setContext} from "@apollo/client/link/context";
import {createUploadLink} from "apollo-upload-client";
import {GQLLINK} from "./components/Util/config";

const httpLink = createUploadLink({
    uri: GQLLINK
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <BrowserRouter>
                <App/>
        </BrowserRouter>
    </ApolloProvider>
)