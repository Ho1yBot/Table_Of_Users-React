import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import SearchInput from '../components/SearchInput';
import UserModal from '../components/UserModal';

// Основной компонент для отображения списка пользователей и управления модальным окном
const UserView = () => {
  // Состояния компонента
  const [filteredUsers, setFilteredUsers] = useState([]); // Состояние для хранения отфильтрованных пользователей
  const [selectedUser, setSelectedUser] = useState(null); // Состояние для хранения выбранного пользователя
  const [modalShow, setModalShow] = useState(false); // Состояние для управления отображением модального окна

  // Обработчик для поиска пользователей
  const handleSearch = (users) => {
    setFilteredUsers(users); // Обновление состояния отфильтрованных пользователей
  };

  // Обработчик клика по строке таблицы
  const handleRowClick = (user) => {
    setSelectedUser(user); // Установка выбранного пользователя
    setModalShow(true); // Отображение модального окна
  };

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    setModalShow(false); // Скрытие модального окна
  };

  return (
    <div className="container">
      {/* Компонент для ввода поиска */}
      <SearchInput onSearch={handleSearch} />
      {/* Таблица с пользователями */}
      <UserTable users={filteredUsers} onRowClick={handleRowClick} />
      {/* Модальное окно с информацией о пользователе */}
      <UserModal user={selectedUser} show={modalShow} handleClose={handleModalClose} />
    </div>
  );
};

export default UserView;
