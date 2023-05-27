import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';

const SignupSuccess = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateHandler = () => {
    handleClose();
    navigate(routes.chatPagePath());
  };

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.singupSuccess.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modals.singupSuccess.descr')}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={navigateHandler}>
          {t('modals.singupSuccess.button')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupSuccess;
