import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartContainer, StatsContainer, StatsLoader } from '../../components';
import { showStats } from '../../features/allJobs/allJobsSlice';

function Stats() {
  const { user } = useSelector(store => store.user);
  const { isLoading, monthlyApplications } = useSelector(store => store.allJobs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      showStats({ url: '/jobs/stats', get: 'true', method: 'GET', auth: `Bearer ${user.token}` })
    );
  }, []);

  if (isLoading) {
    return <StatsLoader />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  );
}
export default Stats;
