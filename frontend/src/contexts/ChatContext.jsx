/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext, useEffect } from 'react';

import store from '../slices/index.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const { newMessage } = messagesActions;

export const ChatContext = createContext({});

const ChatProvider = ({ socket, children }) => {
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      store.dispatch(newMessage(payload));
    });
  });

  const emitMessage = (data) => {
    socket.emit('newMessage', data);
  };

  const sockets = { emitMessage };

  return (
    <ChatContext.Provider value={sockets}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
