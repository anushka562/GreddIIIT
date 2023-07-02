import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/SingleSubgreddiiit';
import UserInfo from '../../components/UserInfo';
import { useNavigate } from 'react-router-dom';
import {Loading, Alert, FormRow, Post, ReportedPost} from '../../components'
import { FaTimes } from 'react-icons/fa';

const initialState = {
  title: '',
  description: '',
  imgPath: '',
}

const SingleSubGreddIIIT = () => {
  const {reports, getReports, user, getReportedPosts, showAlert, currentSubgreddiiit, getSubgreddiiitFollowers, subgreddiiitFollowers, getSubgreddiiitBlockedFollowers, subgreddiiitBlockedFollowers, isLoading, getSubgreddiiitJoinRequests, subgreddiiitJoinRequests, getSubgreddiiitModerators, subgreddiiitModerators, subgreddiiitPosts, getSubgreddiiitPosts, createPost} = useAppContext();
  const [isModerator, setIsModerator] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    
    if(!currentSubgreddiiit?.name){
      navigate('/my-subGreddiiit');
      return;
    }
    getSubgreddiiitModerators();
    getSubgreddiiitFollowers();
    getSubgreddiiitBlockedFollowers();
    getSubgreddiiitJoinRequests();
    getSubgreddiiitPosts();
    getReportedPosts(currentSubgreddiiit._id);  
    getReports(currentSubgreddiiit._id);
    
    if(currentSubgreddiiit.moderators.includes(user._id.toString())){
      setIsModerator(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [name, setName] = useState(currentSubgreddiiit?.name);
  // const [description, setDescription] = useState(currentSubgreddiiit?.description);
  // const [posts, setPosts] = useState(currentSubgreddiiit?.posts);
  // const [followers, setFollowers] = useState(currentSubgreddiiit?.followers);
  // const [moderators, setModerators] = useState(currentSubgreddiiit?.moderators);
  // const [joinRequests, setJoinRequests] = useState(currentSubgreddiiit?.joinRequests);
  // const [tags, setTags] = useState(currentSubgreddiiit?.tags);
  // const [bannedKeywords, setBannedKeywords] = useState(currentSubgreddiiit?.bannedKeywords);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [values, setValues] = useState(initialState);
  

  const handleChange = (e)=>{
      setValues({...values, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    createPost({...values, id: currentSubgreddiiit._id})
    setTimeout(()=>{
      setShowCreatePost(false);
    }, 3000)
    setValues(initialState);
  }

  if(showCreatePost){
    return(
      <Wrapper>
        <form className='form'>
          <button className='close-btn' onClick={()=>setShowCreatePost(false)}>
              <FaTimes/> 
          </button>
          <h4 className='heading'>New Posts</h4>

          {showAlert && <Alert/>}
          <FormRow labelText='title' name="title" value={values.title} type='text' handleChange={handleChange}/>
          <FormRow labelText='image link' name="imgPath" value={values.imgPath} type='text' handleChange={handleChange}/>
          <FormRow labelText='description' name="description" value={values.description} type='text' handleChange={handleChange}/>
          
          <button type='submit' className='btn btn-block' onClick={handleSubmit} disabled={isLoading}>Create</button>
        </form>
      </Wrapper>
    )
  }

  if(isLoading){
    return <Loading center="center"/>
  }

  return (
    <Wrapper>
      <div className='header'>
        <div className='title'>
          {currentSubgreddiiit?.name}
        </div>
        {/* <div className='description'>
          {description}
        </div> */}
        <div className='details'>
          <div className='row-1'>
            <div>{subgreddiiitModerators && subgreddiiitModerators.length} moderators</div>
            <div>{subgreddiiitFollowers && subgreddiiitFollowers.length} followers</div>
            <div>{subgreddiiitPosts && subgreddiiitPosts.length} posts</div>
          </div>
          <div className='row-2'>
            <div>{currentSubgreddiiit?.tags && <span>tags: {currentSubgreddiiit?.tags.map((tag)=>{
              return tag
            }).join(', ')}</span>}</div>
            <div>{currentSubgreddiiit?.bannedKeywords && <span>Banned Keywords: {currentSubgreddiiit?.bannedKeywords.map((keyword)=>{
              return keyword
            }).join(', ')}</span>}</div>
          </div>
        </div>  
      </div>
      <div className='main-container'> 
        <div>
          <div className='posts-container'>
            <h2 className='title'>Posts</h2>
            <div>{showAlert && <Alert/>}</div>
            {subgreddiiitPosts.length>0 ? 
              subgreddiiitPosts.map((post)=>{
                return <Post key={post._id} {...post} del = 'del' subgreddiiitId={currentSubgreddiiit._id}/>
              })
              :
              <h3>No post to display. Create one now!!</h3>
            }
          </div>
          {
            reports.length>0 &&
            <div className='posts-container'>
              <h2 className='title'>Reports</h2>
              <div className='reports-container'>
                {reports.map((report, index)=>{
                  return <ReportedPost key={index} {...report} isModerator={isModerator}/>
                })}
              </div>
            </div>

          }
        </div>

        <div className='sub-container'>
          <div className='btn-container'>
            <button className='btn create-post' onClick={()=>setShowCreatePost(true)}>+ New Post</button>
          </div>
          <div className='moderators-container'>
            <h2 className='title subtitle'>Moderators</h2>
            <div className='user-container '>
              {/* <UserInfo firstName="Anushka" lastName="Agrawal" _id="1" username="_anushka__"/> */}
              {subgreddiiitModerators && subgreddiiitModerators.map((moderator)=>{
                return <UserInfo key={moderator._id} {...moderator} />
              })}
            </div>
          </div>
          {
            isModerator===true &&
            <div className='join-requests-container'>
              <h2 className='title subtitle'>Join Requests</h2>
              <div className='user-container join-request'>
                {/* <UserInfo firstName="Anushka" lastName="Agrawal" _id="1" username="_anushka__" setButton="true" /> */}
                {subgreddiiitJoinRequests && 
                  subgreddiiitJoinRequests.map((request)=>{
                    return <UserInfo key={request._id} {...request} setButton='true' id={currentSubgreddiiit._id}/>
                  })
                }
              </div>
            </div>
          }
          <div className='followers-container'>
            <h2 className='title subtitle'>Followers</h2>
            <div className={isModerator? 'user-container join-request' :'user-container'}> 
              {subgreddiiitFollowers && 
                subgreddiiitFollowers.map((follower)=>{
                  return <UserInfo key={follower._id} {...follower} setBlockButton={isModerator? "true": ''} id={currentSubgreddiiit._id}/>
                })
              }
            </div>
          </div>
          <div className='followers-container'>
            <h2 className='title subtitle'>Blocked Followers</h2>
            <div className='user-container '> 
              {subgreddiiitBlockedFollowers.length>0 && 
                subgreddiiitBlockedFollowers.map((follower)=>{
                  return <UserInfo key={follower._id} {...follower}/>
                })
              }
            </div>
          </div>
        </div>
      </div>
      
    </Wrapper>
  )
}

export default SingleSubGreddIIIT
