import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchInitialState } from '../slices/initialStateSlice.js';

import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const header = await getAuthHeader();
      dispatch(fetchInitialState(header));
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
