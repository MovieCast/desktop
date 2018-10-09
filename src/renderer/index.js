import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/App";

import 'typeface-roboto';
import ElectronStore from './stores/ElectronStore';

console.log(ElectronStore.getState());

ReactDOM.render(
  <App/>,
  document.querySelector('#app')
);