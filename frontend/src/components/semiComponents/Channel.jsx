import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { changeChannel } from '../../slices/channelsSlice.js';

const Channel = ({ channelData, showModal }) => {
  const dispatch = useDispatch();
  const stateChannels = useSelector((state) => state.channelsInfo);
  const { currentChannelId } = stateChannels;
  const { t } = useTranslation();

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
        <Dropdown.Item onClick={() => showModal('renaming', channelData)}>{t('dropdowns.renameChannel')}</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('deleting', channelData)}>{t('dropdowns.deleteChannel')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Channel;
