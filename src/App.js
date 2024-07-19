import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';

// Основной компонент приложения
const App = () => {
  // Состояния компонента
  const [selectedUser, setSelectedUser] = useState(null); // Состояние для хранения выбранного пользователя
  const [showModal, setShowModal] = useState(false); // Состояние для управления отображением модального окна

  // Обработчик клика по строке таблицы
  const handleRowClick = (user) => {
    setSelectedUser(user); // Установка выбранного пользователя
    setShowModal(true); // Отображение модального окна
  };

  // Обработчик закрытия модального окна
  const handleCloseModal = () => {
    setShowModal(false); // Скрытие модального окна
    setSelectedUser(null); // Сброс выбранного пользователя
  };

  return (
    <div className="container">
      {/* Таблица с пользователями */}
      <UserTable onRowClick={handleRowClick} />
      {/* Модальное окно с информацией о пользователе */}
      <UserModal user={selectedUser} show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default App;
