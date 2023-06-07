import React from 'react';

const MessagesList = ({ messages }) => (messages.map((message) => (
  <div key={message.id} className="mb-2" style={{ wordBreak: 'break-all' }}>
    <b>{message.username}</b>
    :
    {' '}
    {message.body}
  </div>
)));

export default MessagesList;
