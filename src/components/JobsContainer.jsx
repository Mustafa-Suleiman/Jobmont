import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/css/wrappers/JobsContainer';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import Job from './Job';
import JobsLoader from './loader/JobsLoader';
import PageBtnContainer from './PageBtnContainer';

function JobsContainer() {
  const { jobs, page, isLoading, numOfPages, totalJobs, search, searchStatus, searchType, sort } =
    useSelector(store => store.allJobs);
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const url = () => {
    if (search) {
      return `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}&search=${search}`;
    }
    return `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  };

  useEffect(() => {
    dispatch(
      getAllJobs({
        url: url(),
        user: 'true',
        method: 'GET',
        auth: `Bearer ${user.token}`,
      })
    );
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return (
      <Wrapper>
        <JobsLoader repeat={8} />
      </Wrapper>
    );
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display.</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map(job => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}
export default JobsContainer;
