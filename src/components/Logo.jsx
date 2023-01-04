import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.webp';

function Logo() {
  return (
    <Link to='/'>
      <img src={logo} alt='Trackify logo' className='logo' />
    </Link>
  );
}

export default Logo;
