import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import useChatContext from '../../hooks/useChatContext.jsx';
import showToast from '../../toastify/showToast.js';

const RenameChannel = (props) => {
  const { onHide, modalInfo } = props;
  const stateChannels = useSelector((state) => state.channelsInfo);
  const { handleRenameChannel } = useChatContext();
  const { t } = useTranslation();

  const getChannelTitles = stateChannels.channels.map((channel) => channel.name);

  const schema = yup.object().shape({
    name: yup.string()
      .min(5, t('modals.renameChannel.titleMin'))
      .max(20, t('modals.renameChannel.titleMax'))
      .required(t('modals.renameChannel.titleRequired'))
      .notOneOf(getChannelTitles, t('modals.renameChannel.titleUnique')),
  });

  const formik = useFormik({
    initialValues: { name: modalInfo.item.name },
    validationSchema: schema,
    onSubmit: (value) => {
      handleRenameChannel({ id: modalInfo.item.id, name: value.name });
      showToast(t('toastify.channelRenamed'), 'info');
      onHide();
    },
  });

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.setSelectionRange(0, modalInfo.item.name.length);
    inputEl.current.focus();
  }, [modalInfo.item.name]);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              ref={inputEl}
              onBlur={formik.handleBlur}
              isInvalid={(formik.touched.name && formik.errors.name)}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" className="float-end mt-3" type="submit">{t('modals.renameChannel.button')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
