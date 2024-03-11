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
  const [error, setError] = useState(''); // State to keep track of errors

  const validateForm = () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop the login process if validation fails

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userId', userInfo.user.uid);
      navigate('/profile');
    } catch (error) {
      setError(error.message); // Set the error state to display the message
      console.error(error.message);
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
        {error && <div className={style.error}>{error}</div>}{' '}
        {/* Display any authentication errors here */}
        <div className={style.inputs}>
          <div className={style.input}>
            <input
              autoFocus
              type='email'
              placeholder='Логин'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Reset error when user starts typing
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
                setError(''); // Reset error when user starts typing
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
