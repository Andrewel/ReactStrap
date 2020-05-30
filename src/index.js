import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './slices';

const store = configureStore({ reducer: rootReducer });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
