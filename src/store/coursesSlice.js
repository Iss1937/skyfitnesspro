import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    allCourses: null,
    allWorkouts: null,
    usersCourses: null,
    currentWorkout: null,
    currentCourse: null,
  },
  reducers: {
    setAllCourses(state, action) {
      state.allCourses = action.payload;
    },
    setAllWorkouts(state, action) {
      state.allWorkouts = action.payload;
    },
    setUsersCourses(state, action) {
      state.usersCourses = action.payload;
    },
    setCurrentWorkout(state, action) {
      state.currentWorkout = action.payload;
    },
    setCurrentCourse(state, action) {
      state.currentCourse = action.payload;
    },
  },
});

export const {
  setAllCourses,
  setAllWorkouts,
  setUsersCourses,
  setCurrentWorkout,
  setCurrentCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
