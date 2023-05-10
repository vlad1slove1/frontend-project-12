/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    newMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
