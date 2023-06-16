import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Nav } from 'react-bootstrap';

import Channel from './semiComponents/Channel.jsx';
import getModal from './modals/index.js';
import { showModal, hideModal } from '../slices/modalsSlice.js';

const renderModal = (modal, hide) => {
  if (!modal.modalType) {
    return null;
  }

  const Component = getModal(modal.modalType);
  return <Component modalInfo={modal} onHide={hide} />;
};

const Channels = () => {
  const stateChannels = useSelector((state) => state.channelsInfo);
  const modalInfo = useSelector((state) => state.modalsInfo);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddChannel = () => dispatch(showModal({ modalType: 'adding' }));
  const handleRenameChannel = (item) => dispatch(showModal({ modalType: 'renaming', currentItem: item }));
  const handleDeleteChannel = (item) => dispatch(showModal({ modalType: 'deleting', currentItem: item }));
  const handleCloseModal = () => dispatch(hideModal());

  const channelsView = useRef(null);
  useEffect(() => {
    channelsView.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [stateChannels.channels.length]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between p-3 align-items-center">
        <b>{t('chat.channels')}</b>
        <Button
          variant="group-veritcal"
          onClick={handleAddChannel}
          type="button"
          className="text-primary ms-auto"
        >
          +
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav className="nav flex-column nav-pills nav-fill px-2">
        {stateChannels.channels.map((channel) => (
          <Channel
            key={channel.id}
            channelData={channel}
            renameChannel={() => handleRenameChannel(channel)}
            deleteChannel={() => handleDeleteChannel(channel)}
            hideModal={hideModal}
          />
        ))}
      </Nav>
      {renderModal(modalInfo, handleCloseModal)}
    </div>
  );
};

export default Channels;
