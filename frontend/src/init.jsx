import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import App from './components/App.jsx';
import store from './slices/index.js';

const init = (socket) => (
  <StoreProvider store={store}>
    <div className="d-flex flex-column h-100">
      <App socket={socket} />
    </div>
  </StoreProvider>
);

export default init;
