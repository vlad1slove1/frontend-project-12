/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  modalType: null,
  currentItem: null,
};

const modalsSlice = createSlice({
  name: 'modalsInfo',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.showModal = false;
      state.modalType = null;
      state.currentItem = null;
    },
    showModal: (state, action) => {
      state.showModal = true;
      state.modalType = action.payload.modalType;
      state.currentItem = action.payload.currentItem;
    },
  },
});

export const { hideModal, showModal } = modalsSlice.actions;
export default modalsSlice.reducer;
