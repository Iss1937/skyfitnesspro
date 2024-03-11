import React, { useEffect, useState } from 'react';
import { Button } from '../../UI/Button/Button';
import style from './Profilepage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../api';
import { setFullCurrentUser } from '../../store/userSlice';
import { Header } from '../../components/header/Header';
import { Link, Outlet, useNavigate } from 'react-router-dom'; 

export const Profile = () => {
  const dispatch = useDispatch();
  const currentId = localStorage.getItem('userId');
  const fullCurrentUser = useSelector((state) => state.userApp.fullCurrentUser);
  const [userCourses, setUserCourses] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (fullCurrentUser) {
      if (fullCurrentUser.courses) {
        setUserCourses(Object.keys(fullCurrentUser?.courses));
      }
    } else if (fullCurrentUser === null) {
      getCurrentUser(currentId).then((currentUser) => {
        dispatch(setFullCurrentUser(currentUser));
      });
    }
  }, [fullCurrentUser, currentId, dispatch]);
  
  const handleChangeLogin = () => {
    navigate('newLogin'); 
  };

  const handleChangePassword = () => {
    navigate('newPassword'); 
  };

  return (
    <>
      <div className={style.container}>
        <header>
          <Header />
        </header>
        <div className={style.profile}>
          <div className={style.heading}>
            <h1 className={style.profile_heading}>Мой профиль</h1>
            {fullCurrentUser ? (
              <>
                <p className={style.profile_text}>
                  Логин: {fullCurrentUser.email}
                </p>
              </>
            ) : (
              <p className={style.profile_text}>
                Пожалуйста, войдите в систему.
              </p>
            )}
          </div>
          <div className={style.profile_button}>
            <Button
              onClick={handleChangeLogin}
              children={'Редактировать логин'}
              className={'button_blue'}
            />
            <Button
              onClick={handleChangePassword}
              children={'Редактировать пароль'}
              className={'button_blue'}
            />
          </div>
        </div>
        <div className={style.course}>
          <h1 className={style.h1}>Мои курсы</h1>
          <div className={style.course_box}>
            {userCourses.length > 0 ? (
              userCourses.map((course) => (
                <div className={style.course_item} key={course}>
                  <img
                    className={style.course_item_img}
                    src={`./img/png/${course}.png`}
                    alt={course}
                  />
                  <Link
                    className={style.button_link}
                    to={`/selectWorkout/${course}`}
                    onClick={() =>
                      localStorage.setItem('currentCourse', course)
                    }
                  >
                    Перейти
                  </Link>
                </div>
              ))
            ) : (
              <p>У вас пока нет купленных курсов</p>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};
