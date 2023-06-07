/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { deleteChannel } from './channelsSlice.js';
import fetchData from '../actions/fetchData.js';

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
      })
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSelector = ((state) => state.messages);
export default messagesSlice.reducer;
