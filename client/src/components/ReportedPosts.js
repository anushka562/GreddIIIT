import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ReportedPosts';
import axios from 'axios';

const ReportedPost = ({_id, reportedUser, reportedPost, reportedSubgreddiiit, concern, reportedBy, isModerator}) => {

    const {blockUser, ignoreReportedPost, deletePost} = useAppContext();
    const [post, setPost] = useState(null);
    const [postUser, setPostUser] = useState(null);
    const [postReportUser, setPostReportUser] = useState(null);

    const getPost = async()=>{
      try {
        const {data} = await axios.get(`api/v1/post/singlePost/${reportedPost}`)
        const {post} = data;
        console.log(post);
        setPost(post);
      } catch (error) {
        console.log(error);
      }
    }

    const getPostUser = async()=>{
      try {
        const {data} = await axios.get(`api/v1/user/singleUser/${reportedUser}`)
        const {user} = data;
        setPostUser(user);
      } catch(error){
          console.log(error);
      }
    }

    const getPostReportUser = async()=>{
      try {
        const {data} = await axios.get(`api/v1/user/singleUser/${reportedBy}`)
        const {user} = data;
        setPostReportUser(user);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      getPost();
      getPostUser();
      getPostReportUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleIgnore = ()=>{
      ignoreReportedPost(_id);
    }
    const handleDelete = ()=>{
      deletePost(reportedPost);
    }

  return (
    <Wrapper>
      <div className='post-container'>
        <div className='post-header'>
          <div className='title'>
            {post?.title}
          </div>
          {/* {del && 
          <div className='delete' >
            <button className='btn-no-style' onClick={handleDelete}>
              <MdOutlineDeleteOutline size={28} del='del'/>
            </button>
          </div>
          } */}
        </div>
        {/* <div className='img'>
          <img src={imgPath} />
        </div> */}
        <div >
          <div className='description'>
            {post?.description}
          </div>
          <div className='posted-by'>
              <span>
                posted by: {postUser?.username}
              </span>
              {/* <button className='btn btn-follow' onClick={()=>addFollower(postPostedBy._id)}>
                follow
              </button> */}
          </div>
          <div className='posted-by'>
              <span>
                reported by: {postReportUser?.username}
              </span>
              {/* <button className='btn btn-follow' onClick={()=>addFollower(postPostedBy._id)}>
                follow
              </button> */}
          </div>
        </div>

        <div className='concern-container'>
          <h4 className='concern'>Concern:</h4>
          <span className='concern-content'>{concern}</span>
        </div>
        {/* <div className='votes'>
          <button className={upvoted ?'btn-vote upvoted': 'btn-vote'} onClick={handleUpvote}>{upvoted?"Upvoted": "Upvote"} ({upvotes.length})</button>
          <button className={downvoted ?'btn-vote downvoted': 'btn-vote'} onClick={handleDownvote}>{downvoted?"Downvoted":"Downvote"} ({downvotes.length})</button>
        </div> */}
        {isModerator &&
          <div className='other'>
            <button className='btn-other comments' onClick={handleIgnore}>Ignore</button>
            <button className='btn-other save' onClick={handleDelete}>Delete Post</button>
            <button className='btn-other report' onClick={()=>blockUser(postUser._id, reportedSubgreddiiit)}>Block User</button>
          </div>
        }
        {/* {showReport &&
          <div className='report-container'>
            <div className='form-row'>
              <h5 className='report-header'>Report Post</h5>
              <label htmlFor="concern" className='form-label'>Concern</label>
              <input type="text" value={concern} name='concern' onChange={(e)=>setConcern(e.target.value)} className='form-input'></input>
            </div>
            <div className='btn-report-container'>
              <button className='btn btn-report' onClick={handleSubmitReport}>
                Submit
              </button>
            </div>
          </div>
        } */}
      </div>
    </Wrapper>
  )
}

export default ReportedPost
