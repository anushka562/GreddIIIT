import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import {Loading, Alert, SingleSubGreddIIIT} from '../../components'
import Wrapper from '../../assets/wrappers/Subgreddiits'
import SearchContainer from '../../components/SearchContainer'

const SubGreddIIIT = () => {
  const {user, isLoading, showAlert, getFollowingSubgreddiiits, getNonFollowingSubgreddiiits, followingSubgreddiiits, nonFollowingSubgreddiiits, search, tags, sort} = useAppContext();

  useEffect(()=>{
    if(user){
      getFollowingSubgreddiiits();
      getNonFollowingSubgreddiiits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    getFollowingSubgreddiiits();
    getNonFollowingSubgreddiiits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, tags]);

  // if(isLoading){
  //   return <Loading center='center'/>
  // }

  return (
    <Wrapper>
      <div className='nav-container'>
        <h4>All SubGreddIIITs</h4>
      </div>
      <SearchContainer/>
      <div className={showAlert ? "nav-container alert-container": "hide"}> 
        {showAlert &&
          <Alert noMargin="no-margin"/>
        }
      </div>
      {isLoading ?
        <Loading center="center"/>
      :
      <div>
        {
        (followingSubgreddiiits.length<=0 && nonFollowingSubgreddiiits.length<=0) 
          ?
          <h3>No Subgreddiiits to display!!</h3>
          :
          <div>
            {followingSubgreddiiits.length>0 && 
              <div className='subgreddiiits-container'>
                  <div>
                    {followingSubgreddiiits.map((subgreddiiit, index)=>{
                      return <SingleSubGreddIIIT key={index} {...subgreddiiit} noDelete='true'/>
                    })}
                  </div>
              </div>
            }
            {/* <div className='dash'></div> */}
            {nonFollowingSubgreddiiits.length>0 &&
              <div className='subgreddiiits-container'>
                  <div>
                    {nonFollowingSubgreddiiits.map((subgreddiiit, index)=>{
                      return <SingleSubGreddIIIT key={index} {...subgreddiiit} noOpen='true' noDelete='true'/>
                    })}
                  </div>
              </div>  
              }
          </div>
        }
      </div>
      }
    </Wrapper>
  ) 
}

export default SubGreddIIIT
