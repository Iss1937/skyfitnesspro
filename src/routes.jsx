import { Routes, Route } from 'react-router-dom';
import { Workout } from './pages/workout/Workout';
import { Training } from './pages/training/Training';
import { Main } from './pages/main/main';
import { Profile } from './pages/profile/Profile';
import { NewLogin } from './pages/newLogin/newLogin';
import { Progress } from './pages/progress/Progress';
import { ProgressCheck } from './pages/progress/ProgressCheck';
import { LoginSignup } from './pages/registration/registration';
import { Login } from './pages/login/login';
import { SelectWorkout } from './pages/selectWorkout/SelectWorkout';
import { NewPassword } from './pages/newPassword/newPassword';
import { ProtectedRoute } from './components/ProtectedRoute'; // Assuming this is the correct path
import { CoursePurchased } from './pages/workout/coursePurchased';
import { WorkoutCompleted } from './pages/training/WorkoutCompleted';

export const AppRoutes = ({ user }) => {
  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<LoginSignup />} />
      </Route>

      <Route path='/workout/:id' element={<Workout />}>
        <Route path='coursePurchased' element={<CoursePurchased />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path='/profile' element={<Profile />}>
          <Route path='newLogin' element={<NewLogin />} />
          <Route path='newPassword' element={<NewPassword />} />
        </Route>
        <Route path='/selectworkout/:id' element={<SelectWorkout />} />
        
        <Route path=':courseId/training/:id/*' element={<Training />}>
          <Route path='workoutCompleted' element={<WorkoutCompleted />} />
          <Route path='Progress' element={<Progress />} />
          <Route path='ProgressCheck' element={<ProgressCheck />} />
        </Route>
      </Route>

      {/* Other routes as needed */}
    </Routes>
  );
};
