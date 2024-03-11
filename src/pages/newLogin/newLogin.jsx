import React, { useState } from 'react';
import { Button } from '../../UI/Button/Button';
import { Logo } from '../../UI/Logo/Logo';
import style from './NewLogin.module.scss';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateEmail } from 'firebase/auth';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { hidePopupFlag } from '../../components/hidePopup/hidePopupFlag';

export const NewLogin = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore(); 

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        // Обновляем email в Firebase Authentication
        await updateEmail(user, email);
        console.log("Email успешно обновлен в Firebase Authentication.");

        
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          email: email, // Обновляем поле email
        });
        console.log("Email успешно обновлен в Firestore.");

        navigate('/profile'); // Навигация к профилю после успешного обновления
      } catch (error) {
        console.error('Ошибка при обновлении email:', error);
      }
    } else {
      console.log('Пользователь не аутентифицирован.');
    }
  };

  const hidePopup = (e, type) => {
    if (hidePopupFlag(e, type)) navigate(-1);
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

        <form onSubmit={handleSubmit} className={style.inputs}>
          <header className={style.inputName}>Новый логин (email):</header>
          <div className={style.input}>
            <input
              autoFocus
              type='email'
              placeholder='Email'
              value={email}
              onChange={handleInputChange}
            />
          </div>

          <div className={style.buttonsContainer}>
            <Button
              type='submit'
              children={'Сохранить'}
              className={'button_blue'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
