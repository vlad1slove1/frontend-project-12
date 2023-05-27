import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import * as yup from 'yup';

import useChatContext from '../../hooks/useChatContext.jsx';

const RenameChannel = (props) => {
  const { onHide, modalInfo } = props;
  const stateChannels = useSelector((state) => state.channelsInfo);
  const { handleRenameChannel } = useChatContext();

  const getChannelTitles = stateChannels.channels.map((channel) => channel.name);

  const schema = yup.object().shape({
    name: yup.string()
      .min(3, 'от 5 до 20 символов')
      .max(20, 'от 5 до 20 символов')
      .required('не должно быть пустым')
      .notOneOf(getChannelTitles, 'название каналов не должно повторяться'),
  });

  const formik = useFormik({
    initialValues: { name: modalInfo.item.name },
    validationSchema: schema,
    onSubmit: (value) => {
      handleRenameChannel({ id: modalInfo.item.id, name: value.name });
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
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
            <input className="btn btn-primary float-end" type="submit" value="Подтвердить" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
