import React, { useState } from 'react';
import { Logo } from '../../UI/Logo/Logo';
import style from './Registration.module.scss';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { getDatabase, ref, set } from 'firebase/database';
// import { useDispatch } from 'react-redux';
// import { setCurrentUser, setUserId } from '../../store/userSlice'; // Adjust if necessary

import { Button } from '../../UI/Button/Button';
import { hidePopupFlag } from '../../components/hidePopup/hidePopupFlag';

export const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Write additional user data to the database
      writeUserData(userId, email);

      // Dispatch Redux action to store the user's ID
      // dispatch(setUserId(userId));
      localStorage.setItem('userId', userId);
      // can store the entire user object or just the email in your Redux store
      // dispatch(setCurrentUser({ userId, email }));

      navigate('/login'); // Redirect after successful registration
    } catch (error) {
      console.error(error.message);
      alert('Error during registration: ' + error.message);
    }
  };

  // This function writes additional user data to the Firebase database
  function writeUserData(userId, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      email: email,
      courses: [], // Example data //Убрал ненужный ноль в массиве.
    });
  }

  const hidePopup = (e, type) => {
    if (hidePopupFlag(e, type)) navigate('/');
  };

  return (
    <div
      className={style.popup_wrapper}
      onMouseUp={(e) => hidePopup(e, 'mouse')}
      onKeyDown={(e) => hidePopup(e, 'kbd')}
    >
      <div className={style.container} id='#popup'>
        <header>
          <Logo className={style.logo} />
        </header>

        <div className={style.inputs}>
          <div className={style.input}>
            <input
              autoFocus
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <input
              type='password'
              placeholder='Пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <input
              type='password'
              placeholder='Повторите пароль'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={style.buttonsContainer}>
          <Button
            onClick={handleRegistration}
            children={'Зарегистрироваться'}
            className={'button_white'}
          />
        </div>
      </div>
    </div>
  );
};
