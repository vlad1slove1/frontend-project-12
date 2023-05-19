import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import store from './slices/index.js';
import ChatContext from './contexts/ChatContext.jsx';
import { addMessage } from './slices/messagesSlice.js';

const init = () => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  const handleNewMessage = (payload) => {
    socket.emit('newMessage', payload, (response) => {
      console.log(response.status);
    });
  };

  return (
    <Provider store={store}>
      <ChatContext.Provider value={{ handleNewMessage }}>
        <div className="d-flex flex-column h-100">
          <App />
        </div>
      </ChatContext.Provider>
    </Provider>
  );
};

export default init;
