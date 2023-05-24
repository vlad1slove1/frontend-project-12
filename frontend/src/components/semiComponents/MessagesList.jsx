import React from 'react';

const MessagesList = ({ messages }) => (messages.map((message) => (
  <div key={message.id} className="text-break mb-2">
    <b>{message.username}</b>
    :
    {' '}
    {message.body}
  </div>
)));

export default MessagesList;
