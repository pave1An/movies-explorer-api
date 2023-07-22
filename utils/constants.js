const jwtSecretKeyDev = 'jwt-secret-dev';
const dataBaseHostDev = 'mongodb://127.0.0.1:27017/bitfilmsdb-test ';
const cookieDeleteMessage = { message: 'Кука очищена!' };
const errorTexts = {
  conflictEmail: 'Данный email уже используется',
  conflictDefault: 'Попытка создать дубликат уникального поля',
  badRequestEmail: 'не является правильным адресом электронной почты',
  badRequestDefault: 'Переданы некорректные данные запроса',
  notFoundMovie: 'Фильм не найден',
  notFoundUser: 'Пользователь не найден',
  notFoundDefault: 'Страница не найдена',
  forbiddenMovieDelete: 'Попытка удалить запись другого пользователя',
  forbiddenDefault: 'Запрос отклонен или запрещен',
  unAuthorizedToken: 'Токен некорректен',
  unAuthorizedDefault: 'Неверно указан логин или пароль',
  internalDefault: 'На сервере произошла ошибка',
};

module.exports = {
  jwtSecretKeyDev,
  dataBaseHostDev,
  errorTexts,
  cookieDeleteMessage,
};
