import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channel from './semiComponents/Channel.jsx';
import getModal from './modals/index.js';

const renderModal = (info, hideModal) => {
  if (!info.action) {
    return null;
  }

  const Component = getModal(info.action);
  return <Component modalInfo={info} onHide={hideModal} />;
};

const Channels = () => {
  const stateChannels = useSelector((state) => state.channelsInfo);
  const [modalInfo, setModalInfo] = useState({ action: null, item: null });
  const { t } = useTranslation();

  const hideModal = () => setModalInfo({ action: null, item: null });
  const showModal = (action, item = null) => setModalInfo({ action, item });

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button
          onClick={() => showModal('adding')}
          type="button"
          className="btn btn-outline-info btn-sm"
        >
          +
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {stateChannels.channels.map((channel) => (
          <Channel key={channel.id} channelData={channel} showModal={showModal} />
        ))}
      </ul>
      {renderModal(modalInfo, hideModal)}
    </div>
  );
};

export default Channels;
