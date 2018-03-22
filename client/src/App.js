import React, { Component } from 'react';
import { Provider } from 'react-redux'

import configureStore from './store/configureStore';

import Router from './routes';

// Import Bulma as main css framework
// More detail at: https://bulma.io/
import 'bulma/css/bulma.css';
import './App.css';

export const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
