import React, { useState } from 'react';
import { Button } from '../../UI/Button/Button';
import { Logo } from '../../UI/Logo/Logo';
import style from './NewLogin.module.scss'; // Ensure this matches your filename
import { useNavigate } from 'react-router-dom';
import { getAuth, updateEmail } from 'firebase/auth'; // Import Firebase Auth functions
import { hidePopupFlag } from '../../components/hidePopup/hidePopupFlag';

export const NewLogin = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth
  console.log(auth);
  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser; // Get the current user

    if (user) {
      try {
        console.log(user, email);
        await updateEmail(user, email); // Update the user's email
        console.log('Email updated successfully');
        navigate('/profile'); // Navigate to profile after successful update
      } catch (error) {
        console.error('Error updating email:', error);
        // Handle errors here, such as permission denied or email already in use.
      }
    } else {
      // Handle case where no user is signed in
      console.log('No user is signed in to update email.');
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
      </div>{' '}
    </div>
  );
};
