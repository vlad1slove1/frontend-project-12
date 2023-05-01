/* eslint-disable no-param-reassign */

import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import uniqueId from 'lodash/uniqueId.js';
import { Plus } from 'react-bootstrap-icons';

import { channelsInfoSelector, changeChannel } from '../slices/initialStateSlice';

const Channel = ({ channelData }) => {
  const dispatch = useDispatch();
  const stateChannels = useSelector(channelsInfoSelector);
  const { currentChannelId } = stateChannels;

  const { id, name } = channelData;

  const handleClick = (channelId) => {
    dispatch(changeChannel(channelId));
  };

  return (
    <Button
      variant={id === currentChannelId ? 'secondary' : 'light'}
      className="text-start w-100 rounded-0"
      onClick={() => handleClick(id)}
    >
      #
      {' '}
      {name}
    </Button>
  );
};

const Channels = () => {
  const stateChannels = useSelector(channelsInfoSelector);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          variant="light"
          size="sm"
          type="button"
        >
          <Plus size="15px" />
        </Button>
      </div>
      <ListGroup
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
        id="channels-box"
      >
        {stateChannels.channels.map((channel) => (
          <Channel key={uniqueId()} channelData={channel} />
        ))}
      </ListGroup>
    </div>
  );
};

export default Channels;
