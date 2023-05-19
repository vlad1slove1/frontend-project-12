import React from 'react';
import { useSelector } from 'react-redux';

import MessagesList from './messages/MessagesList.jsx';
import MessageForm from './messages/MessageForm.jsx';

const Messages = () => {
  const channelsData = useSelector((state) => state.channelsInfo);
  const { channels, currentChannelId, loadingStatus } = channelsData;
  const messagesData = useSelector((state) => state.messagesInfo);
  const { messages } = messagesData;

  if (loadingStatus === 'loading') return (<p>Loading...</p>);

  const channelData = channels.filter((channel) => channel.id === currentChannelId);
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);

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
            {channelMessages.length}
            {' '}
            сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {channelMessages.length === 0 ? null : <MessagesList messages={channelMessages} />}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Messages;
