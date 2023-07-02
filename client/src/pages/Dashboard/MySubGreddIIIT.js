import React, { useEffect } from 'react'
import { FaTimes } from "react-icons/fa";
import { FormRow, Alert, SingleSubGreddIIIT, Loading } from '../../components';
import { useState } from 'react';
import Wrapper from '../../assets/wrappers/MySubgreddiiit';
import { useAppContext } from '../../context/appContext';


const initialState = {
  name: "",
  imgPath:"",
  description: "",
  tags: "",
  bannedKeywords: "",
}

const MySubGreddIIIT = () => {
  const [values, setValues] = useState(initialState);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {isLoading, showAlert, createSubgreddiiit, mySubGreddiiits, getMySubgreddiiits} = useAppContext();
  
  const handleChange = (e)=>{
      // console.log(e.target);
      setValues({...values, [e.target.name]:e.target.value})
  }

  const closeCreateForm = (e)=>{
    setShowCreateForm(false);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    createSubgreddiiit(values);
    setTimeout(()=>{
      setShowCreateForm(false);
    }, 3000)
  }

  useEffect(()=>{
    getMySubgreddiiits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if(showCreateForm){
    return(
      <Wrapper>
        <form className='form'>
          <button className='close-btn' onClick={closeCreateForm}>
              <FaTimes/> 
          </button>
          <h4 className='heading'>New SubGreddIIIT</h4>

          {showAlert && <Alert/>}
          <FormRow labelText='SubGreddIIIT name' name="name" value={values.name} type='text' handleChange={handleChange}/>
          <FormRow labelText='image link' name="imgPath" value={values.imgPath} type='text' handleChange={handleChange}/>
          <FormRow labelText='description' name="description" value={values.description} type='text' handleChange={handleChange}/>
          <FormRow labelText='tags (seperated by commas)' name="tags" value={values.tags} type='text' handleChange={handleChange}/>
          <FormRow labelText='banned Keywords (seperated by commas)' name="bannedKeywords" value={values.bannedKeywords} type='text' handleChange={handleChange}/>
          
          <button type='submit' className='btn btn-block' onClick={handleSubmit} disabled={isLoading}>Create</button>
        </form>
      </Wrapper>
    )
  }
  
  if(isLoading){
    return <Loading center='center'/>
  }
  

  return (
    <Wrapper>
      <div className='nav-container'>
        <h4>My SubGreddIIITs</h4>
        <button className='btn btn-red' onClick={()=>setShowCreateForm(true)}>Create <strong>+</strong></button>
      </div>
      <div className='subgreddiiits-container'>
        {mySubGreddiiits ?
          <div>
            {mySubGreddiiits.map((subgreddiiit, index)=>{
              return <SingleSubGreddIIIT key={index} {...subgreddiiit}/>
            })}
          </div>
        :
        "You don't have any subGreddIIIT. Create one now!!"
        }
      </div>
    </Wrapper>
  )
}

export default MySubGreddIIIT
