import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Компонент для отображения модального окна с информацией о пользователе
const UserModal = ({ user, show, handleClose }) => {
  // Если пользователь не выбран, не рендерить модальное окно
  if (!user) return null;

  return (
    // Использование компонента Modal из react-bootstrap
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {/* Заголовок модального окна с именем пользователя */}
        <Modal.Title>{`${user.firstName} ${user.lastName}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Отображение деталей пользователя */}
        <p>Возраст: {user.age}</p>
        <p>Адрес: {`${user.address.city}, ${user.address.address}`}</p>
        <p>Рост: {user.height}</p>
        <p>Вес: {user.weight}</p>
        <p>Телефон: {user.phone}</p>
        <p>Email: {user.email}</p>
      </Modal.Body>
      <Modal.Footer>
        {/* Кнопка для закрытия модального окна */}
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
