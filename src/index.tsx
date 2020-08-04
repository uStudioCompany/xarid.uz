import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';

import configJson from '../config.json';

import { App } from './core/app';
import AppConfig from './shared/services/app-config';

ReactDOM.render(
  <AppConfig {...configJson}>
    <App />
  </AppConfig>,
  document.getElementById('root')
);
