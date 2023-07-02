import Wrapper from '../assets/wrappers/UserInfo'
import { useAppContext } from '../context/appContext'

const NotFollowingInfo = ({firstName, lastName, username, _id}) => {
  const {addFollower} = useAppContext();
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{firstName.charAt(0)}</div>
        <div className='info'>
          <h5>{firstName} {lastName}</h5>
          <p>{username}</p>
        </div>
        <div className='actions'>
        <button type='button' className='btn edit-btn' onClick={()=>addFollower(_id)}>
            Follow
        </button>
        </div>
      </header>
      
        {/* <footer> */}
        {/* </footer> */}
    </Wrapper>
  )
}

export default NotFollowingInfo
