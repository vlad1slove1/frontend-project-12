import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dropdown,
  ButtonGroup,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { changeChannel } from '../../slices/channelsSlice.js';

const Channel = ({ channelData, renameChannel, deleteChannel }) => {
  const dispatch = useDispatch();
  const stateChannels = useSelector((state) => state.channelsInfo);
  const { currentChannelId } = stateChannels;
  const { t } = useTranslation();

  const { id, name, removable } = channelData;

  const handleClick = (channelId) => {
    dispatch(changeChannel(channelId));
  };

  return (
    <Nav.Item key={id} as="li" className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex btn-group">
        <Button
          variant={id === currentChannelId ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => handleClick(id)}
        >
          #
          {' '}
          {name}
        </Button>
        {removable && (
          <Dropdown.Toggle variant={id === currentChannelId ? 'secondary' : 'light'}>
            <span className="visually-hidden">{t('dropdowns.control')}</span>
          </Dropdown.Toggle>
        )}
        <Dropdown.Menu>
          <Dropdown.Item onClick={renameChannel}>{t('dropdowns.renameChannel')}</Dropdown.Item>
          <Dropdown.Item onClick={deleteChannel}>{t('dropdowns.deleteChannel')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
