import { useAppContext } from "../context/appContext"
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/UsersInfoContainer";
import FollowingInfo from "./FollowingInfo";
import NotFollowingInfo from "./NotFollowingInfo"
// import Alert from "./Alert";

const Following = () => {
    const {isLoading, userFollowings, userNotFollowings} = useAppContext();

    if(isLoading){
        return <Loading center='center'/>
    }

    if(userFollowings.length === 0){
        return <Wrapper>
            <h4>You don't follow anyone</h4>
            <div className="divider"></div>     
            <div className="jobs">
                {userNotFollowings && userNotFollowings.map((notFollowing)=>{
                    return <NotFollowingInfo key= {notFollowing._id} {...notFollowing}/>
                })}
            </div>
        </Wrapper>
    }
  return (
    <Wrapper>
        {/* {showAlert && <Alert/>} */}
        <div className="jobs">
            {userFollowings.map((following)=>{
                return <FollowingInfo key={following._id} {...following}/>
            })}
        </div>   
        <div className="divider"></div>     
        <div className="jobs">
            {userNotFollowings && userNotFollowings.map((notFollowing)=>{
                return <NotFollowingInfo key= {notFollowing._id} {...notFollowing}/>
            })}
        </div>
    </Wrapper>
  )
}

export default Following
