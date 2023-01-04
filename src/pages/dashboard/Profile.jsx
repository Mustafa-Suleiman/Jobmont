import { useState } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//toast
import { toast } from 'react-toastify';
//components and style
import { FormRow } from '../../components';
import Wrapper from '../../assets/css/wrappers/DashboardFormPage';
Wrapper;
import { userDataHandler } from '../../features/user/userSlice';

function Profile() {
  const { user, isLoading } = useSelector(store => store.user);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  const { name, email, lastName, location } = userData;
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      toast.warning('Please fill out all fields');
      return;
    } else {
      dispatch(
        userDataHandler({
          url: '/auth/updateUser',
          user: userData,
          method: 'PATCH',
          auth: `Bearer ${user.token}`,
        })
      );
    }
  };

  const onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData(state => ({ ...state, [name]: value }));
  };
  return (
    <Wrapper>
      <form method='post' className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className='form-center'>
          <FormRow type='text' name='name' value={name} onChangeHandler={onChangeHandler} />
          <FormRow
            type='text'
            name='lastName'
            labelText='Last name'
            value={lastName}
            onChangeHandler={onChangeHandler}
          />
          <FormRow type='text' name='email' value={email} onChangeHandler={onChangeHandler} />
          <FormRow type='text' name='location' value={location} onChangeHandler={onChangeHandler} />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile;
