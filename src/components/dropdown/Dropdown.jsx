import React, { useState } from 'react';
import style from './Dropdown.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { getCurrentUser } from '../../pages/api';
import { setFullCurrentUser } from '../../store/userSlice';

export function Dropdown() {
  const currentId = localStorage.getItem('userId');
  const [dropdownState, setDropdownState] = useState(false);
  const fullCurrentUser = useSelector((state) => state.userApp.fullCurrentUser);
  const handleDropdownClick = () => setDropdownState(!dropdownState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  function handleSignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert(error);
      });
    localStorage.removeItem('userId');
    navigate('/');
  }

  const updateUserDetails = () => {
    getCurrentUser(currentId).then((currentUser) => {
      dispatch(setFullCurrentUser(currentUser));
    });
  };

  return (
    <div className={style.dropdown_box}>
      <div className={style.dropdown_svg}></div>
      <div className={style.container}>
        <button
          type='button'
          className={style.header_item}
          onClick={handleDropdownClick}
        >
          {fullCurrentUser?.email}
        </button>
        {dropdownState && (
          <div className={style.dropdown}>
            <Link className={style.submenu_item} to='/'>
              На главную
            </Link>
            <Link className={style.submenu_item} to='/profile' onClick={updateUserDetails}>
              Профиль
            </Link>
            <button className={style.submenu_item} onClick={handleSignOut}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
