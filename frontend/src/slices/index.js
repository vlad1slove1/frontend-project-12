import { configureStore, combineReducers } from '@reduxjs/toolkit';

import channelsSlice from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';

const reducer = combineReducers({
  channelsInfo: channelsSlice,
  messagesInfo: messagesSlice,
});

export default configureStore({
  reducer,
});
