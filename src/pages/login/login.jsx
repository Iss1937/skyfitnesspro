import React, { useState } from 'react';
import { Button } from '../../UI/Button/Button';
import { Logo } from '../../UI/Logo/Logo';
import style from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { hidePopupFlag } from '../../components/hidePopup/hidePopupFlag';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Состояние для отслеживания ошибок

  const validateForm = () => {
    if (!email || !password) {
      setError('Пожалуйста, введите и email, и пароль.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Прекращаем процесс логина, если валидация не прошла

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userId', userInfo.user.uid);
      navigate('/profile');
    } catch (error) {
      console.error(error.code); 
      if (error.code === 'auth/user-not-found') {
        setError('Такого пользователя не существует.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Неверный пароль');
      } else {
        setError('Такого пользователя не существует');
      }
    }
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

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
        {error && <div className={style.error}>{error}</div>} {/* Отображаем ошибки аутентификации */}
        <div className={style.inputs}>
          <div className={style.input}>
            <input
              autoFocus
              type='email'
              placeholder='Логин'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Сброс ошибки при начале ввода
              }}
            />
          </div>
          <div className={style.input}>
            <input
              type='password'
              placeholder='Пароль'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(''); // Сброс ошибки при начале ввода
              }}
            />
          </div>
        </div>
        <div className={style.buttonsContainer}>
          <Button
            onClick={handleLogin}
            children={'Войти'}
            className={'button_blue'}
          />
          <Button
            onClick={handleRegisterClick}
            children={'Зарегистрироваться'}
            className={'button_white'}
          />
        </div>
      </div>
    </div>
  );
};
