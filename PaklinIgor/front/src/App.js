import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';

//Связка redux - react
import {Provider} from 'react-redux';

//store
import store from './store/store';

import Layout from './layout/Layout';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout/>
        </Router>
      </Provider>
    );
  }
}

export default App;
