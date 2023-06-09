import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

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
    const state = store.getState();
    const { currentChannelId } = state.channelsInfo;

    store.dispatch(deleteChannel(payload));
    if (currentChannelId === payload.id) store.dispatch(changeChannel(1));
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

  // remove all bad words from the filter
  // now the filter can't filter anything cause there are no bad words
  filter.clearList();

  // adding word (from builtin dictionary) into the filter
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    autoInstrument: true,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
