import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import App from './components/App.jsx';
import store from './slices/index.js';
import ChatContext from './contexts/ChatContext.jsx';
import { addMessage } from './slices/messagesSlice.js';
import {
  changeChannel,
  addChannel,
  deleteChannel,
  renameChannel,
} from './slices/channelsSlice.js';
import i18n from './locales/index.js';

const init = () => {
  const socket = io();

  socket.on('newMessage', (payload) => store.dispatch(addMessage(payload)));

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
    store.dispatch(changeChannel(payload.id));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(deleteChannel(payload));
    store.dispatch(changeChannel(1));
  });

  socket.on('renameChannel', (payload) => store.dispatch(renameChannel(payload)));

  const handleNewMessage = (payload) => socket.emit('newMessage', payload);
  const handleNewChannel = (payload) => socket.emit('newChannel', payload);
  const handleDeleteChannel = (payload) => socket.emit('removeChannel', payload);
  const handleRenameChannel = (payload) => socket.emit('renameChannel', payload);

  const handlers = {
    handleNewMessage,
    handleNewChannel,
    handleDeleteChannel,
    handleRenameChannel,
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ChatContext.Provider value={handlers}>
          <div className="d-flex flex-column h-100">
            <App />
            <ToastContainer />
          </div>
        </ChatContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
