import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import routes from '../../routes';

const SignupSuccess = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    handleClose();
    navigate(routes.chatPagePath());
  };

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Вы успешно зарегистрировались</Modal.Title>
      </Modal.Header>
      <Modal.Body>Нажмите кнопку ниже, чтобы перейти на страницу с чатом</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={navigateHandler}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupSuccess;
