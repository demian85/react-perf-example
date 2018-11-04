import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import TableView from './TableView';

import './App.module.css';

const App = () => {
  return (
    <Provider store={store}>
      <TableView />
    </Provider>
  );
}

export default App;
