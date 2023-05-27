import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import * as yup from 'yup';

import useChatContext from '../../hooks/useChatContext.jsx';

const AddChannel = (props) => {
  const { onHide } = props;
  const stateChannels = useSelector((state) => state.channelsInfo);
  const { handleNewChannel } = useChatContext();

  const getChannelTitles = stateChannels.channels.map((channel) => channel.name);

  const schema = yup.object().shape({
    name: yup.string()
      .min(3, 'от 5 до 20 символов')
      .max(20, 'от 5 до 20 символов')
      .required('не должно быть пустым')
      .notOneOf(getChannelTitles, 'название каналов не должно повторяться'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: (value) => {
      handleNewChannel(value);
      onHide();
    },
  });

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              data-testid="input-body"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputEl}
            />
          </FormGroup>

          {formik.errors.name && formik.touched.name
            ? (<div style={{ color: 'red' }}>{formik.errors.name}</div>)
            : null}

          <div className="d-flex justify-content-end mt-2">
            <input className="btn btn-primary float-end" type="submit" value="Добавить" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
