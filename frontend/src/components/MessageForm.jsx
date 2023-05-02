import React from 'react';
import {
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';

import { BoxArrowInRight } from 'react-bootstrap-icons';

const MessageForm = () => (
  <Form>
    <div className="input-group has-validation">
      <InputGroup>
        <Form.Control
          placeholder="Введите сообщение..."
          aria-label="enterMessage"
          name="enterMessage"
          id="enterMessage"
          autoComplete="enterMessage"
          required
        />

        <Button variant="outline-secondary" type="submit">
          <BoxArrowInRight size="15px" />
        </Button>
      </InputGroup>
    </div>
  </Form>
);

export default MessageForm;
