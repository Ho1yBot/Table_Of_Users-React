import React, { useState, useEffect, useRef } from 'react';
import { fetchUsers } from '../services/api';

const UserTable = ({ onRowClick }) => {
  // Состояние для хранения пользователей, конфигурации сортировки, ошибок, ширины колонок и поискового запроса
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [error, setError] = useState(null);
  const [columnWidths, setColumnWidths] = useState({
    firstName: 200,
    age: 100,
    gender: 100,
    phone: 200,
    address: 300,
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Используем useRef для хранения ссылок на элементы колонок
  const columns = useRef({
    firstName: null,
    age: null,
    gender: null,
    phone: null,
    address: null,
  });

  // useEffect для получения данных о пользователях при монтировании компонента
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        setError('Ошибка при загрузке данных.');
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  // Обработчик начала изменения ширины колонки
  const handleMouseDown = (key, e) => {
    const startX = e.clientX;
    const startWidth = columns.current[key].offsetWidth;

    const onMouseMove = e => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth > 50) {
        setColumnWidths(prevWidths => ({
          ...prevWidths,
          [key]: newWidth,
        }));
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const age = user.age.toString();
    const gender = user.gender ? user.gender.toLowerCase() : '';
    const phone = user.phone ? user.phone.toLowerCase() : '';
    const addressCity = user.address && user.address.city ? user.address.city.toLowerCase() : '';
    const addressStreet = user.address && user.address.street ? user.address.street.toLowerCase() : '';

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      age.includes(searchTerm.toLowerCase()) ||
      gender.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm.toLowerCase()) ||
      addressCity.includes(searchTerm.toLowerCase()) ||
      addressStreet.includes(searchTerm.toLowerCase())
    );
  });

  // Сортировка пользователей по выбранной колонке
  const sortedUsers = [...filteredUsers];

  if (sortConfig.key) {
    sortedUsers.sort((a, b) => {
      const aKey = sortConfig.key.split('.').reduce((o, i) => o[i], a);
      const bKey = sortConfig.key.split('.').reduce((o, i) => o[i], b);
      if (aKey < bKey) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aKey > bKey) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  // Запрос на сортировку по ключу
  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    } else {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  // Получение индикатора сортировки для колонки
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return ' ↑';
      } else if (sortConfig.direction === 'descending') {
        return ' ↓';
      }
    }
    return '';
  };

  return (
    <div>
      {/* Отображение ошибки при ее наличии */}
      {error && <div className="error">{error}</div>}
      {/* Поле для ввода поискового запроса */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Поиск..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      {/* Таблица с пользователями */}
      <table className="table" style={{ width: '100%', maxWidth: '1200px' }}>
        <thead>
          <tr>
            {/* Колонки таблицы */}
            <th
              style={{ width: columnWidths.firstName }}
              className="resizable"
              ref={el => (columns.current.firstName = el)}
              onClick={() => requestSort('firstName')}
            >
              <span>ФИО{getSortIndicator('firstName')}</span>
              <div className="resizer" onMouseDown={e => handleMouseDown('firstName', e)} />
            </th>
            <th
              style={{ width: columnWidths.age }}
              className="resizable"
              ref={el => (columns.current.age = el)}
              onClick={() => requestSort('age')}
            >
              <span>Возраст{getSortIndicator('age')}</span>
              <div className="resizer" onMouseDown={e => handleMouseDown('age', e)} />
            </th>
            <th
              style={{ width: columnWidths.gender }}
              className="resizable"
              ref={el => (columns.current.gender = el)}
              onClick={() => requestSort('gender')}
            >
              <span>Пол{getSortIndicator('gender')}</span>
              <div className="resizer" onMouseDown={e => handleMouseDown('gender', e)} />
            </th>
            <th
              style={{ width: columnWidths.phone }}
              className="resizable"
              ref={el => (columns.current.phone = el)}
            >
              <span>Номер телефона</span>
              <div className="resizer" onMouseDown={e => handleMouseDown('phone', e)} />
            </th>
            <th
              style={{ width: columnWidths.address }}
              className="resizable"
              ref={el => (columns.current.address = el)}
              onClick={() => requestSort('address.city')}
            >
              <span>Адрес{getSortIndicator('address.city')}</span>
              <div className="resizer" onMouseDown={e => handleMouseDown('address', e)} />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Строки таблицы с данными пользователей */}
          {sortedUsers.map(user => (
            <tr key={user.id} onClick={() => onRowClick(user)}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{`${user.address.city}, ${user.address.address}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

