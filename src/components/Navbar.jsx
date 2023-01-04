//style && icons & assets
import Logo from './Logo';
import Wrapper from '../assets/css/wrappers/Navbar';
import { FaHome, FaUserCircle, FaCaretDown, FaAlignLeft } from 'react-icons/fa';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../data/slices/navbarSlice';
import { resetStore } from '../features/user/userSlice';
//local state
import { useState } from 'react';

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => dispatch(resetStore('Logged out.'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default Navbar;
