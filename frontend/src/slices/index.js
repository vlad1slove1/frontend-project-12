import { configureStore, combineReducers } from '@reduxjs/toolkit';

import channelsSlice from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';
import modalsSlice from './modalsSlice.js';

const reducer = combineReducers({
  channelsInfo: channelsSlice,
  messagesInfo: messagesSlice,
  modalsInfo: modalsSlice,
});

export default configureStore({ reducer });
