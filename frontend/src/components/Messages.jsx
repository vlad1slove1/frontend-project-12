import React from 'react';
import { useSelector } from 'react-redux';

import { channelsInfoSelector, messagesInfoSelector } from '../slices/initialStateSlice';

const Messages = () => {
  const channelsData = useSelector(channelsInfoSelector);
  const messagesData = useSelector(messagesInfoSelector);

  const { currentChannelId } = channelsData;

  const channelData = channelsData.channels.find((channel) => channel.id === currentChannelId);
  const { name } = channelData;
  const messagesCount = messagesData.messages.length;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {name}
            </b>
          </p>
          <span className="text-muted">
            {' '}
            {messagesCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
