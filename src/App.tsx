import { ApolloClient, ApolloLink, ApolloProvider, concat, createHttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from 'store';
import Routes from './routes/Routes';
import { selectUser } from './store/auth/selectors';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';

function App() {
  const user = useSelector(selectUser);

  const httpLink = createHttpLink({
    uri: 'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        'access-Token': user.token ? user.token : '',
        client: user.clientToken,
        uid: user.email,
      },
    }));

    return forward(operation);
  });

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <PersistGate persistor={persistor}>
      <ApolloProvider client={client}>
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        <Routes />
      </ApolloProvider>
    </PersistGate>
  );
}

export default App;
