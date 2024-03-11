import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    fullCurrentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
    setFullCurrentUser: (state, action) => {
      //Весь текущий пользователь с базы, вместе с его курсами
      state.fullCurrentUser = action.payload;
    },
  },
});

export const { setCurrentUser, setFullCurrentUser } = userSlice.actions;

export default userSlice.reducer;
