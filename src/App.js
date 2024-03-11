import React, { useEffect, useState } from 'react';
import './App.css';
import { AppRoutes } from './routes';
import { useDispatch } from 'react-redux';
import { auth } from './firebase'; 
import {
  getAllCourses,
  getAllWorkouts,
  getCurrentUser,
  getUsersCourses,
} from './pages/api';

import {
  setAllCourses,
  setAllWorkouts,
  setUsersCourses,
} from './store/coursesSlice';
import { setFullCurrentUser } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const currentId = localStorage.getItem('userId');
  const [currentUser, setCurrentUser] = useState(currentId);

  console.log(currentUser);
  // Listener for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Получаем все курсы
  useEffect(() => {
    getAllCourses()
      .then((courses) => {
        dispatch(setAllCourses(Object.values(courses)));
      })
      .catch(() => {})
      .finally(() => {});
  }, [dispatch]);

  // Получаем все тренировки
  useEffect(() => {
    getAllWorkouts().then((workouts) => {
      dispatch(setAllWorkouts(Object.values(workouts)));
    });
  }, [dispatch]);

  // Получаем шаблоны всех курсов для пользователей
  useEffect(() => {
    getUsersCourses().then((usersCourses) => {
      dispatch(setUsersCourses(Object.values(usersCourses)));
    });
  }, [dispatch]);

  useEffect(() => {
    getUsersCourses().then((usersCourses) => {
      dispatch(setUsersCourses(Object.values(usersCourses)));
    });
  }, [dispatch]);

  // Получаем текущего пользователя
  useEffect(() => {
    if (currentUser) {
      getCurrentUser(currentUser.uid).then((currentUserDetails) => {
        dispatch(setFullCurrentUser(currentUserDetails));
      });
    }
  }, [currentUser, dispatch]);

  return <AppRoutes user={currentUser} />;
}

export default App;
