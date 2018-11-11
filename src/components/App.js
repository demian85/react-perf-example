import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import { onRenderCallback } from '../store/utils';
import TableView from './TableView';

import './App.module.css';

const App = () => {
  return (
    <Provider store={store}>
      <React.unstable_Profiler id="App" onRender={onRenderCallback}>
        <TableView />
      </React.unstable_Profiler>
    </Provider>
  );
};

export default App;
