import React, { useEffect, useState } from 'react';
import { Button } from '../../UI/Button/Button';
import { Logo } from '../../UI/Logo/Logo';
import style from './NewPassword.module.scss';
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword } from 'firebase/auth';
import { hidePopupFlag } from '../../components/hidePopup/hidePopupFlag';

export const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Assuming the user is already signed in
    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, password);
        alert('Password updated successfully.');
        navigate('/profile'); // Redirect the user to their profile page or login page
      } catch (error) {
        console.error('Error updating password:', error);
        alert(
          "Failed to update password. Make sure you're logged in recently."
        );
      }
    }
  };

  const hidePopup = (e, type) => {
    if (hidePopupFlag(e, type)) navigate(-1);
  };

  const onFocusFirstInput = () => {
    const firstInputEl = document.getElementsByTagName('input');
    firstInputEl[0]?.focus();
  };
  useEffect(() => onFocusFirstInput(), []);

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
          <header className={style.inputName}>Новый пароль:</header>
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
            onClick={handleChangePassword}
            children={'Сохранить'}
            className={'button_blue'}
          />
        </div>
      </div>
    </div>
  );
};
