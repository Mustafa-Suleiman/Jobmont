import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import asyncThunk from '../../utlis/asyncThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const getAllJobs = createAsyncThunk(
  'allJobs/getAllJobs',
  async ({ url, user, method, auth }, thunkAPI) => {
    return await asyncThunk(url, user, method, auth, thunkAPI);
  }
);

const showStats = createAsyncThunk(
  'allJobs/showStats',
  async ({ url, get, method, auth }, thunkAPI) => {
    const res = await asyncThunk(url, get, method, auth, thunkAPI);
    return res;
  }
);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    hideLoading(state) {
      state.isLoading = false;
    },
    handleChange(state, { payload: { name, value } }) {
      state.page = 1;
      state[name] = value;
    },
    clearFilters(state) {
      return initialState;
    },
    changePage(state, { payload }) {
      state.page = payload;
    },
    clearAllJobsState() {
      return initialState;
    },
  },
  extraReducers: {
    [getAllJobs.pending]: state => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // showStats
    [showStats.pending]: state => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { hideLoading, handleChange, clearFilters, changePage, clearAllJobsState } =
  allJobsSlice.actions;

export { getAllJobs, showStats };

export default allJobsSlice.reducer;
