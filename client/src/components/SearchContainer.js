import {FormRow, FormRowSelect} from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import {useState, useMemo } from 'react'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const [localTags, setLocalTags] = useState('');
  const {isLoading, sort, sortOptions, handleChange, clearFilters } = useAppContext();

  const handleSearch = (e)=>{
    handleChange({name:e.target.name, value:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    setLocalSearch('')
    setLocalTags('');
    clearFilters();
  }

  const debounce =()=>{
    let timeoutId;
    return (e)=>{
      setLocalSearch(e.target.value)
      clearTimeout(timeoutId);
      timeoutId  = setTimeout(()=>{
        handleChange({name: e.target.name, value: e.target.value})
      }, 1000)
    }
  }
  const debounce2 =()=>{
    let timeoutId;
    return (e)=>{
      setLocalTags(e.target.value)
      clearTimeout(timeoutId);
      timeoutId  = setTimeout(()=>{
        handleChange({name: e.target.name, value: e.target.value})
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(()=> debounce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[])
  const optimizedDebounce2 = useMemo(()=> debounce2()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[])

    return (
    <Wrapper> 
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow type='text' name='search' value={localSearch} handleChange={optimizedDebounce}/>
          <FormRow type='text' name='tags' labelText='Tags (Seperated by commas)' value={localTags} handleChange={optimizedDebounce2}/>
          <FormRowSelect labelText = 'sort' name='sort' value={sort} handleChange={handleSearch} list={sortOptions}/>
          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
