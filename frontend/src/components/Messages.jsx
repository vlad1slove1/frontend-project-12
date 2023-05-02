import React from 'react';
import { useSelector } from 'react-redux';

import MessageForm from './MessageForm.jsx';
import {
  channelsInfoSelector,
  messagesInfoSelector,
  loadingSelector,
} from '../slices/initialStateSlice.js';

const Messages = () => {
  const channelsData = useSelector(channelsInfoSelector);
  const messagesData = useSelector(messagesInfoSelector);
  const loadingStatus = useSelector(loadingSelector);

  if (loadingStatus === 'loading') {
    return <p>Loading...</p>;
  }

  const { channels, currentChannelId } = channelsData;
  const channelData = channels.filter((channel) => channel.id === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {channelData[0].name}
            </b>
          </p>
          <span className="text-muted">
            {messagesData.messages.length}
            {' '}
            сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" />
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Messages;
