const API_URL = 'https://dummyjson.com/users';

// Функция для получения списка пользователей
export const fetchUsers = async () => {
  // Выполняем HTTP-запрос для получения данных
  const response = await fetch(API_URL);
  // Преобразуем ответ в формат JSON
  const data = await response.json();
  // Возвращаем массив пользователей из полученных данных
  return data.users;
};

// Функция для поиска пользователей по запросу
export const searchUsers = async (query) => {
  // Выполняем HTTP-запрос для поиска данных с учетом запроса
  const response = await fetch(`${API_URL}/search?q=${query}`);
  // Преобразуем ответ в формат JSON
  const data = await response.json();
  // Возвращаем массив найденных пользователей из полученных данных
  return data.users;
};
