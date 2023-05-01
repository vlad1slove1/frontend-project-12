import { configureStore } from '@reduxjs/toolkit';

import initialStateReducer from './initialStateSlice.js';

export default configureStore({
  reducer: initialStateReducer,
});
