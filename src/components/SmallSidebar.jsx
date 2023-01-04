//assets and styles
import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/css/wrappers/SmallSidebar';
import Logo from './Logo';
//redux
import { useDispatch, useSelector } from 'react-redux';
//components and helpers
import { toggleSidebar } from '../data/slices/navbarSlice';
import NavLinks from './NavLinks';

function SmallSidebar() {
  const { isSidebarOpen } = useSelector(store => store.navbar);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
}
export default SmallSidebar;
