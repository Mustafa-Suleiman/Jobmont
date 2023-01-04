import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../data/localStorage';
import asyncThunk from '../../utlis/asyncThunk';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';

// this slice is for register, login and profile page

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

const userDataHandler = createAsyncThunk(
  `user/userDataHandler`,
  async ({ url, user, method, auth }, thunkAPI) => {
    return asyncThunk(url, user, method, auth, thunkAPI);
  }
);

const resetStore = createAsyncThunk('user/resetStore', async (message, thunkAPI) => {
  try {
    console.log('logout');
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    [userDataHandler.pending]: state => {
      state.isLoading = true;
    },
    [userDataHandler.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      addUserToLocalStorage(user);
      state.isLoading = false;
      state.user = user;

      const message = () => {
        if (!!location.href.match(/profile/)) {
          return 'Profile updated';
        }
        if (user.token && !!location.href.match(/register/)) {
          return `Hello there👋 ${user.name}`;
        }
      };
      toast.success(message());
    },

    [userDataHandler.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // resetStore
    [resetStore.rejected]: (state, { payload }) => {
      toast.error(payload || 'There was an error.');
    },
  },
});

export const { logoutUser } = userSlice.actions;

export { userDataHandler, resetStore };

export default userSlice.reducer;
