import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

import { changeChannel } from '../../slices/channelsSlice.js';

const Channel = ({ channelData, showModal }) => {
  const dispatch = useDispatch();
  const stateChannels = useSelector((state) => state.channelsInfo);
  const { currentChannelId } = stateChannels;

  const { id, name, removable } = channelData;

  const handleClick = (channelId) => {
    dispatch(changeChannel(channelId));
  };

  return (
    <Dropdown as={ButtonGroup}>
      <Button
        variant={id === currentChannelId ? 'secondary' : 'light'}
        className="text-start w-100 rounded-0"
        onClick={() => handleClick(id)}
      >
        #
        {' '}
        {name}
      </Button>
      {removable && (<Dropdown.Toggle variant={id === currentChannelId ? 'secondary' : 'light'} />)}
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('renaming', channelData)}>Переименовать</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('deleting', channelData)}>Удалить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Channel;
