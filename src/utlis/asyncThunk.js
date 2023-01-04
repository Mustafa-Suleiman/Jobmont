import { resetStore } from '../features/user/userSlice';
import AJAX from './AJAX';

const asyncThunk = async (url, user, method, auth, thunkAPI) => {
  try {
    //method default is POST and auth is ''
    const res = await AJAX(url, user, method, auth);
    return res;
  } catch (err) {
    console.log(err);
    if (err.status === 401) {
      thunkAPI.dispatch(resetStore());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    const errMsg = await err.json();
    return thunkAPI.rejectWithValue(errMsg.msg);
  }
};

export default asyncThunk;
