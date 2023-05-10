/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import fetchData from '../actions/fetchData.js';

const initialState = {
  loadingStatus: 'loading',
  error: null,
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    changeChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.channels = action.payload.channels;
        state.currentChannelId = action.payload.currentChannelId;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
