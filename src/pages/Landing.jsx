import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
import mainImg from '../assets/images/main.webp';
import Wrapper from '../assets/css/wrappers/LandingPage';
export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            <span>Organize</span> your job search
          </h1>
          <p>Track your job applications and keep your job search organized, all in one place.</p>
          <Link to='/register' className='btn btn-hero'>
            login/register
          </Link>
        </div>
        <img src={mainImg} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
}
