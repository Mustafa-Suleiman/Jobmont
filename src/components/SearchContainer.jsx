import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/css/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';
import { useMemo, useState } from 'react';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } = useSelector(
    store => store.allJobs
  );

  const { jobTypeOptions, statusOptions } = useSelector(store => store.job);

  const dispatch = useDispatch();

  //for all inputs except search field
  const handleSearch = e => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  //delay state change for search field for 1 s
  const debounce = () => {
    let timeoutID;
    return e => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  // memo for to prevent recreating the function on rerender
  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
          {/* search position */}

          <FormRow type='text' name='search' value={search} onChangeHandler={handleSearch} />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={localSearch}
            onChangeHandler={optimizedDebounce}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            onChangeHandler={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            onChangeHandler={handleSearch}
            list={sortOptions}
          />
          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
