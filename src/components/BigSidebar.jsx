import { useSelector } from 'react-redux';
import Wrapper from '../assets/css/wrappers/BigSidebar';
import Logo from './Logo';
import NavLinks from './NavLinks';

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector(store => store.navbar);

  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container ' : 'sidebar-container show-sidebar'}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
