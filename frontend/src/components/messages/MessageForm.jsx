import React, { useRef, useEffect, useState } from 'react';
import {
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import useChatContext from '../../hooks/useChatContext.jsx';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const { handleNewMessage } = useChatContext();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message) {
      const { username } = JSON.parse(localStorage.getItem('userId'));
      handleNewMessage({ body: message, channelId: currentChannelId, username });
      setMessage('');
    }
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <div className="input-group has-validation">
        <InputGroup>
          <Form.Control
            placeholder="Введите сообщение..."
            aria-label="enterMessage"
            name="enterMessage"
            id="enterMessage"
            autoComplete="enterMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={inputEl}
            required
          />

          <Button variant="outline-secondary" type="submit">
            <BoxArrowInRight size="15px" />
          </Button>
        </InputGroup>
      </div>
    </Form>
  );
};

export default MessageForm;
