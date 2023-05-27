import { Modal, Button } from 'react-bootstrap';

const SignupError = ({ show, handleClose }) => (
  <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Произошла ошибка</Modal.Title>
    </Modal.Header>
    <Modal.Body>Пользователь с таким именем уже существует</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Закрыть
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SignupError;
