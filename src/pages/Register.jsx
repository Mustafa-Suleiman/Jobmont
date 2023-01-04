//hooks
import React, { useEffect, useState } from 'react';
//redux
import { userDataHandler } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
//assets and components
import { Logo, FormRow } from '../components';
//style
import Wrapper from '../assets/css/wrappers/RegisterPage';
//toastify
import { toast } from 'react-toastify';
//react-router
import { useNavigate } from 'react-router-dom';

// local state
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

//component for signUp and login
function Register() {
  const [{ name, email, password, isMember }, setValues] = useState(initialState);

  const { isLoading, user } = useSelector(store => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMember = () => {
    setValues(state => ({ ...state, isMember: !isMember }));
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  const onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setValues(state => ({ ...state, [name]: value }));
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!email || !password || (!isMember && !name)) {
      return toast.warning('Please fill out all fields');
    }
    if (isMember) {
      //login
      return dispatch(userDataHandler({ url: '/auth/login', user: { email, password } }));
    } else {
      //register
      dispatch(userDataHandler({ url: '/auth/register', user: { name, email, password } }));
    }
  };

  return (
    <Wrapper className='full-page'>
      <form method='POST' className='form' onSubmit={submitHandler}>
        <Logo />
        <h3>{isMember ? 'Login' : 'SignUp'}</h3>
        {/* name field */}
        {isMember || (
          <FormRow type='text' name='name' value={name} onChangeHandler={onChangeHandler} />
        )}
        {/* email field */}
        <FormRow type='email' name='email' value={email} onChangeHandler={onChangeHandler} />
        {/* password field */}
        <FormRow
          type='password'
          name='password'
          value={password}
          onChangeHandler={onChangeHandler}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'submit'}
        </button>
        <button
          type='submit'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              userDataHandler({
                url: '/auth/login',
                user: { email: 'testUser@test.com', password: 'secret' },
              })
            )
          }
        >
          {isLoading ? 'Loading...' : 'Demo'}
        </button>
        <p>
          {isMember ? 'Not a member yet?' : 'Already a member'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
