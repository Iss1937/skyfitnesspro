import React from 'react';
import styles from '../progress/Progress.module.scss';
import Hand from '../progress/Hand.png';
// import { hidePopupFlag } from '../../components/hidePopup/hidePopupFlag';
import { useNavigate } from 'react-router-dom';

export const WorkoutCompleted = () => {
  const navigate = useNavigate();
  
  const hidePopup = () => {
     navigate(-1);
  };

  return (
    <div
      className={styles.popup_wrapper}
      onClick={() => hidePopup()}
      onKeyDown={() => hidePopup()}
    >
      <div className={styles.progressForm} id='#popup'>
        <div className={styles.page}>
          <div className={styles.progressCheckForm}>
            <div className={styles.headerProgress}>Тренировка пройдена!</div>
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
