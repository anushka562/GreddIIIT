import Wrapper from '../assets/wrappers/UserInfo'
import { useAppContext } from '../context/appContext'

const FollowingInfo = ({firstName, lastName, username, _id}) => {
  const { unfollowFollowing} = useAppContext();

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{firstName.charAt(0)}</div>
        <div className='info'>
          <h5>{firstName} {lastName}</h5>
          <p>{username}</p>
        </div>
        <div className='actions'>
        <button type='button' className='btn delete-btn' onClick={()=>unfollowFollowing(_id)}>
            Unfollow
        </button>
        </div>
      </header>
      
        {/* <footer> */}
        {/* </footer> */}
    </Wrapper>
  )
}

export default FollowingInfo
