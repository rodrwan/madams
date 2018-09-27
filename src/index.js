import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const options = {
  timeout: 5000,
  position: 'top center',
};

ReactDOM.render(
  <Provider template={AlertTemplate} {...options}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
