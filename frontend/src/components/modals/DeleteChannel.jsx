import React from 'react';
import {
  Modal,
  FormGroup,
} from 'react-bootstrap';

import useChatContext from '../../hooks/useChatContext.jsx';

const DeleteChannel = (props) => {
  const { onHide, modalInfo } = props;
  const channelId = modalInfo.item.id;
  const { handleDeleteChannel } = useChatContext();

  const handleSubmit = () => {
    handleDeleteChannel({ id: channelId });
    onHide();
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="body" className="form-group">
            <p>
              Вы уверены, что хотите удалить канал
              {' '}
              <b>
                {modalInfo.item.name}
                ?
              </b>
            </p>
            <input className="btn btn-danger float-end" type="submit" value="Удалить" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannel;
