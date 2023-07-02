import { useAppContext } from "../context/appContext"
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/UsersInfoContainer";
import FollowerInfo from "./FollowerInfo";
// import Alert from "./Alert";

const Followers = () => {
    const {isLoading, userFollowers} = useAppContext();
    if(isLoading){
        return <Loading center= 'center'/>
    }

    if(userFollowers.length === 0){
        return <Wrapper>
            <h4>No followers</h4>
        </Wrapper>
    }

    
  return (
    <Wrapper>
        {/* {showAlert && <Alert/>} */}
        <div className="jobs">
            {userFollowers.map((follower)=>{
                return <FollowerInfo key={follower._id} {...follower}/>
            })}
        </div>        
    </Wrapper>
  )
}

export default Followers;