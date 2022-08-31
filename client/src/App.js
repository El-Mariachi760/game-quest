import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import PrivateEvents from './pages/PrivateEvents';
import PrivateRoutes from './utils/PrivateRoutes';
import Profile from './pages/Profile';

// Apollo imports
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path='/profile:username' element={<Profile />} />
              <Route path="/privateEvents" element={<PrivateEvents />} />
            </Route>
          </Routes>
        </Router>
      </div>  
    </ApolloProvider>
  );
}

export default App;
