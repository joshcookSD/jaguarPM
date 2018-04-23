import React from 'react';
import { render } from "react-dom";
import { ApolloProvider} from "react-apollo";
import client from './apollo';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';


const Jaguar = (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

render(Jaguar, document.getElementById('root'));
registerServiceWorker();
