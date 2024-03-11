const BASE_URL =
  'https://fitness-pro-9efbb-default-rtdb.europe-west1.firebasedatabase.app';

//Запрос на все курсы
export async function getAllCourses() {
  const response = await fetch(BASE_URL + '/courses.json', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Ошибка сервера');
  }
  const newData = await response.json();

  return newData;
}

//Запрос на все тренировки
export async function getAllWorkouts() {
  const response = await fetch(BASE_URL + '/workouts.json', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Ошибка сервера');
  }
  const newData = await response.json();

  return newData;
}

//Запрос на текущего пользователя
export async function getCurrentUser(currentId) {
  const response = await fetch(BASE_URL + `/users/${currentId}.json`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Ошибка сервера');
  }
  const newData = await response.json();
  return newData;
}

//Запрос на шаблоны всех курсов для пользователей
export async function getUsersCourses() {
  const response = await fetch(BASE_URL + `/usersCourses.json`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Ошибка сервера');
  }
  const newData = await response.json();

  return newData;
}
