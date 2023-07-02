import React from 'react'
import Wrapper from '../assets/wrappers/SingleSubgreddiiit'
import { useAppContext } from '../context/appContext'

const UserInfo = ({setBlockButton, firstName, lastName, username, _id, setButton, id}) => {
    const {acceptJoinRequest, rejectJoinRequest} = useAppContext();


  return (
    <Wrapper>
        <header>
        <div className='main-icon'>{firstName.charAt(0)}</div>
        <div className='info'>
          <h5>{firstName} {lastName}</h5>
          <p>{username}</p>
        </div>
        {setButton && 
        <div className='actions'>
            <button type='button' className='btn edit-btn' onClick={()=>acceptJoinRequest(id, _id)}>
                Accept
            </button>
            <button type='button' className='btn delete-btn' onClick={()=>rejectJoinRequest(id, _id)}>
                Reject
            </button>
        </div>}
        
        {
          setBlockButton &&
          <div className='action'>
            <button type='button' className='btn delete-btn'>Block</button>
          </div>
        }
      </header>
    </Wrapper>
  )
}

export default UserInfo
