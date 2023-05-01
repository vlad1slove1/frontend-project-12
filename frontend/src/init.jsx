import React from 'react';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './slices/index.js';

const init = () => (
  <Provider store={store}>
    <div className="d-flex flex-column h-100">
      <App />
    </div>
  </Provider>
);

export default init;
