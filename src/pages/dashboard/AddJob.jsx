import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/css/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../../components';
import { clearValues, createJob, editJob, handleChange } from '../../features/job/jobSlice';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector(store => store.job);
  const dispatch = useDispatch();

  const { user } = useSelector(store => store.user);

  const handleSubmit = e => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.warning('Please Fill Out All Fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          url: `/jobs/${editJobId}`,
          job: { position, company, jobLocation, jobType, status },
          method: 'PATCH',
          auth: `Bearer ${user.token}`,
        })
      );
      return;
    }
    dispatch(
      createJob({
        url: '/jobs',
        user: { position, company, jobLocation, jobType, status },
        auth: `Bearer ${user.token}`,
      })
    );
    dispatch(clearValues());
  };

  const handleJobInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    !isEditing && dispatch(handleChange({ name: 'jobLocation', value: user.location }));
  }, []);

  return (
    <Wrapper>
      <form method='POST' className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        <div className='form-center'>
          {/* position */}
          <FormRow type='text' name='position' value={position} onChangeHandler={handleJobInput} />
          {/* company */}
          <FormRow type='text' name='company' value={company} onChangeHandler={handleJobInput} />
          {/* location */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            onChangeHandler={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            onChangeHandler={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            onChangeHandler={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
