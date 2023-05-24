/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { deleteChannel } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChannel, (state, action) => {
        const filteredMessages = state.messages
          .filter((message) => message.channelId !== action.payload.id);
        state.messages = filteredMessages;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSelector = ((state) => state.messages);
export default messagesSlice.reducer;
