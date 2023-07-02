import React from 'react'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const SingleSubGreddIIIT = ({_id, name, description, posts, followers, moderators, noOpen, noDelete}) => {
    const navigate = useNavigate();
  const {leaveSubgreddiiit, sendJoinRequest, deleteSubgreddiiit, openSubgreddiiit, currentSubgreddiiit} = useAppContext()

  const handleOpen = (id)=>{
      openSubgreddiiit(id);
      if(currentSubgreddiiit?.name){
        navigate('/single-subGreddiiit');
      }
  }

  return (    
        <div className='subgreddiiit'>
          <div className='main-icon'> 
            {name.charAt(0)}
          </div>
          <div className='info'>
            <div className='name'>
              {name}
            </div>
            <div className='description'>
              {description}
            </div>
            <div className='detail'>
              <span>{posts.length} posts</span>
              <span>{followers.length} followers</span>
            </div>
          </div>
          <div className='btn-container'>
            {
              !noOpen &&
              <button className='btn btn-open' onClick={()=>handleOpen(_id)}>Open</button>
            }
            {
              !noDelete &&
              <button className='btn btn-delete' onClick={()=>deleteSubgreddiiit(_id)}>Delete</button>
            }
            {
              !noOpen && noDelete && 
              <button className='btn btn-delete' onClick={()=>leaveSubgreddiiit(_id)}>Leave</button>
            }
            {
              noOpen &&
              <button className='btn btn-open' onClick={()=>sendJoinRequest(_id)}>Join</button>
            }
          </div>
        </div>

  )
}

export default SingleSubGreddIIIT
