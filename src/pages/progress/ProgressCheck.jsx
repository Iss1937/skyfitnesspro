import React from 'react';
import styles from './Progress.module.scss';
import Hand from './Hand.png';
import { useNavigate } from 'react-router-dom';

export const ProgressCheck = () => {
  const navigate = useNavigate();

  const hidePopup = () => {
    navigate(-2);
  };

  return (
    <div className={styles.popup_wrapper} onClick={() => hidePopup()} onKeyDown={() => hidePopup()}>
      <div className={styles.progressForm} id='#popup'>
        <div className={styles.page}>
          <div className={styles.progressCheckForm}>
            <div className={styles.headerProgress}>Ваш прогресс засчитан!</div>
            <div className={styles.imgBox}>
              <img className={styles.Hand} src={Hand} alt='Hand' />
              <input autoFocus style={{opacity: 0}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
