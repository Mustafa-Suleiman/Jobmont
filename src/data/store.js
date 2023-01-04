import { configureStore } from '@reduxjs/toolkit';
import allJobsReducer from '../features/allJobs/allJobsSlice';
import jobReducer from '../features/job/jobSlice';
import userReducer from '../features/user/userSlice';
import navbarReducer from './slices/navbarSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
});

export default store;
