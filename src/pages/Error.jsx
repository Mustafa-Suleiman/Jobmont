import img404 from '../assets/images/404.svg';
import Wrapper from '../assets/css/wrappers/ErrorPage';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <Wrapper>
      <div>
        <img src={img404} alt='page not found' />
        <h3>ohh! Page Not Found</h3>
        <p>we can't seem to find the page you're looking for</p>
        <Link to='/'>Back home</Link>
      </div>
    </Wrapper>
  );
}

export default Error;
