import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import useChatContext from '../../hooks/useChatContext.jsx';
import showToast from '../../toastify/showToast.js';

const AddChannel = (props) => {
  const { onHide } = props;
  const stateChannels = useSelector((state) => state.channelsInfo);
  const { handleNewChannel } = useChatContext();
  const { t } = useTranslation();
  const inputEl = useRef();

  const getChannelTitles = stateChannels.channels.map((channel) => channel.name);

  const schema = yup.object().shape({
    name: yup.string()
      .min(5, t('modals.addChannel.titleMin'))
      .max(20, t('modals.addChannel.titleMax'))
      .required(t('modals.addChannel.titleRequired'))
      .notOneOf(getChannelTitles, t('modals.addChannel.titleUnique')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: async (value) => {
      if (filter.check(value.name)) {
        showToast(t('toastify.badWordChannel'), 'warning');
        inputEl.current.setSelectionRange(0, value.name.length);
        inputEl.current.focus();
        return;
      }

      try {
        await handleNewChannel(value);
        showToast(t('toastify.newChannel'), 'success');
        onHide();
      } catch (error) {
        showToast(t('toastify.newChannelError'), 'error');
        console.error(error.message);
      }
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              ref={inputEl}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />

            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.addChannel.inputLabel')}</Form.Label>

            <Form.Control.Feedback type="invalid">
              {formik.errors.name || null}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" className="float-end mt-3" type="submit">{t('modals.addChannel.button')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
