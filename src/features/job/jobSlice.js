import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../data/localStorage';
import AJAX from '../../utlis/AJAX';
import asyncThunk from '../../utlis/asyncThunk';
import { getAllJobs, hideLoading } from '../allJobs/allJobsSlice';
import { resetStore } from '../user/userSlice';

const createJob = createAsyncThunk(
  `user/createJob`,
  async ({ url, user, method, auth }, thunkAPI) => {
    return await asyncThunk(url, user, method, auth, thunkAPI);
  }
);

const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async ({ url, user, method, auth }, thunkAPI) => {
    try {
      //method default is POST and auth is ''
      const res = await AJAX(url, user, method, auth);

      thunkAPI.dispatch(
        getAllJobs({ url: '/jobs', user: 'true', method: 'GET', auth: `Bearer ${user.token}` })
      );

      return res;
    } catch (err) {
      thunkAPI.dispatch(hideLoading());

      if (err.status === 401) {
        thunkAPI.dispatch(resetStore());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
      }
      const errMsg = await err.json();
      return thunkAPI.rejectWithValue(errMsg.msg);
    }
  }
);

const editJob = createAsyncThunk('job/editJob', async ({ url, job, method, auth }, thunkAPI) => {
  const res = await asyncThunk(url, job, method, auth, thunkAPI);
  thunkAPI.dispatch(clearValues());
  return res;
});

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => ({
      ...initialState,
      jobLocation: getUserFromLocalStorage()?.location || '',
    }),
    setEditJob(state, { payload }) {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    // createJob
    [createJob.pending]: state => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: state => {
      state.isLoading = false;
      toast.success('Job Created');
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // deleteJob
    [deleteJob.fulfilled]: state => {
      toast.success('Job Deleted');
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    // editJob
    [editJob.pending]: state => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: state => {
      state.isLoading = false;
      toast.success('Job Modified');
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default jobSlice.reducer;

const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export { createJob, deleteJob, handleChange, clearValues, setEditJob, editJob };
