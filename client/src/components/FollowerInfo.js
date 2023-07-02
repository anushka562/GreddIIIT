import React from 'react'
import Wrapper from '../assets/wrappers/UserInfo'
import { useAppContext } from '../context/appContext'

const FollowerInfo = ({firstName, lastName, username, _id}) => {
  const {addFollower, removeFollower}=useAppContext()

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{firstName.charAt(0)}</div>
        <div className='info'>
          <h5>{firstName} {lastName}</h5>
          <p>{username}</p>
        </div>
          <div className='actions'>
            <button className='btn edit-btn' onClick={()=>addFollower(_id)}>
                Follow
            </button>
            <button type='button' className='btn delete-btn' onClick={()=>removeFollower(_id)}>
                Remove
            </button>
          </div>
      </header>
      
        {/* <footer>
            
        </footer> */}
    </Wrapper>
  )
}

export default FollowerInfo
