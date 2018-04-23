
import ApolloClient, {InMemoryCache, ApolloLink, split} from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import {getMainDefinition} from 'apollo-utilities'
import {setContext} from 'apollo-link-context';
import createFileLink from './createFileLink';


const httpLink = new createFileLink({ uri: `http://localhost:3001/graphfql` });

const cache = new InMemoryCache({});
persistCache({
    cache,
    storage: window.localStorage,
});

const middlewareLink = setContext(() => ({
    headers: {
        'x-token': localStorage.getItem('token'),
        'x-refresh-token': localStorage.getItem('refreshToken'),
    },
}));

const afterwareLink = new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
        const { response: { headers } } = operation.getContext();
        if (headers) {
            const token = headers.get('x-token');
            const refreshToken = headers.get('x-refresh-token');
            //set up user auth here
            if (token) {
                localStorage.setItem('token', token);
            }

            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
        }

        return response;
    }));

const httpLinkWithMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink));

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    httpLinkWithMiddleware,
);



export default new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    link,
    cache,
    clientState: {}
});