import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import coursesReducer from './coursesSlice';

export default configureStore({
  reducer: {
    userApp: userReducer,
    coursesApp: coursesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});
