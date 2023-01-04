import Wrapper from '../assets/css/wrappers/JobInfo';

function JobInfo({ icon, text }) {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  );
}
export default JobInfo;
