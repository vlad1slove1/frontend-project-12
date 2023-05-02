/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';

export const fetchInitialState = createAsyncThunk(
  'channelsInfo/setInitialState',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.getUserPath(), { headers: authHeader });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  loadingStatus: 'loading',
  error: null,
  channelsInfo: {
    channels: [],
    currentChannelId: null,
  },
  messagesInfo: {
    messages: [],
  },
};

const initialStateSlice = createSlice({
  name: 'chatData',
  initialState,
  reducers: {
    changeChannel: (state, action) => {
      state.channelsInfo.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialState.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchInitialState.fulfilled, (state, action) => {
        state.channelsInfo.channels = action.payload.channels;
        state.channelsInfo.currentChannelId = action.payload.currentChannelId;
        state.messagesInfo.messages = action.payload.messages;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchInitialState, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { changeChannel } = initialStateSlice.actions;
export const channelsInfoSelector = (state) => state.channelsInfo;
export const messagesInfoSelector = (state) => state.messagesInfo;
export const loadingSelector = (state) => state.loadingStatus;
export default initialStateSlice.reducer;
