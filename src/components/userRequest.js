import { getCurrentUser } from '../pages/api';
import { setFullCurrentUser } from '../store/userSlice';

export const UpdateUserDetails = (dispatch) => {
  const currentId = localStorage.getItem('userId');

  getCurrentUser(currentId).then((currentUser) => {
    dispatch(setFullCurrentUser(currentUser));
  });
};
