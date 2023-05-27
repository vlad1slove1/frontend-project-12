import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useChatContext from '../../hooks/useChatContext.jsx';

const DeleteChannel = (props) => {
  const { onHide, modalInfo } = props;
  const channelId = modalInfo.item.id;
  const { handleDeleteChannel } = useChatContext();
  const { t } = useTranslation();

  const handleSubmit = () => {
    handleDeleteChannel({ id: channelId });
    onHide();
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="body" className="form-group">
            <p>
              {t('modals.deleteChannel.descr')}
              {' '}
              <b>
                {modalInfo.item.name}
              </b>
              {' '}
              ?
            </p>
          </Form.Group>

          <Button variant="danger" className="float-end mt-3" type="submit">{t('modals.deleteChannel.button')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannel;
