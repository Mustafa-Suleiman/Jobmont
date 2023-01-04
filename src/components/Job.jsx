import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/css/wrappers/Job';
import { deleteJob, setEditJob } from '../features/job/jobSlice';
import JobInfo from './JobInfo';

function Job({ _id, position, company, jobLocation, jobType, createdAt, status }) {
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const date = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(createdAt));

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/dashboard/add-job'
              className='btn edit-btn'
              onClick={() => {
                dispatch(
                  setEditJob({ editJobId: _id, position, company, jobLocation, jobType, status })
                );
              }}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() =>
                dispatch(
                  deleteJob({
                    url: `/jobs/${_id}`,
                    user: user,
                    method: 'DELETE',
                    auth: `Bearer ${user.token}`,
                  })
                )
              }
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job;
