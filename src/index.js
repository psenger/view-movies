import store from './store/index';
import { Provider } from 'react-redux';
import 'whatwg-fetch';
import App from './App';
import 'es6-promise/auto';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
