import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const fetchData = createAsyncThunk(
  'channelsInfo/setInitialState',
  async () => {
    try {
      const response = await axios.get(routes.getUserPath(), { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.message;
    }
  },
);

export default fetchData;
