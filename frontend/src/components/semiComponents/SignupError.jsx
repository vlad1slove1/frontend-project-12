import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SignupError = ({ show, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.signupError.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modals.signupError.descr')}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          {t('modals.signupError.button')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupError;
