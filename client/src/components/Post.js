import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import Wrapper from '../assets/wrappers/Post';
import {MdOutlineDeleteOutline} from 'react-icons/md'
// import {FaRegComments} from 'react-icons/fa'
import axios from 'axios'
import Comment from './Comment';

const Post = ({_id, title, description, upvotes, downvotes, postedBy, del, savedBy, subgreddiiitId}) => {

  const { reportedPosts, reportPost, user, postPostedBy, isLoadingPost, upvotePost, downvotePost, deletePost, savePost, addFollower} = useAppContext();

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reported, setReported] = useState(false);
  const [concern, setConcern] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState('');
  const [allowDelete, setAllowDelete] = useState(false);
  const [postUser, setPostUser] = useState(postPostedBy);
  
  const getPostUser = async()=>{
    try {
        const {data} = await axios.get(`api/v1/user/singleUser/${postedBy}`)
        const {user} = data;
        setPostUser(user);
    } catch(error){
        console.log(error);
    }
  }

  const getPostComments = async()=>{
    try{
      const {data} = await axios.get(`api/v1/comment/postComments/${_id}`);
      const {comments} = data;
      console.log(comments);
      setPostComments(comments);
      
    }catch(error){
      console.log(error);
    }
  }

  const deleteComment = async(id)=>{
    try{
      const {data} = await axios.delete(`api/v1/comment/delete/${id}`);
      const {comments} = data;
      setPostComments(comments);
    }catch(error){
      console.log(error);
    }
  }

  const likeComment = async(id)=>{
    try {
      const {data} = await axios.patch(`api/v1/comment/like/${id}/${user._id}`);
      const {comments} = data;
      setPostComments(comments);
    } catch (error) {
      console.log(error);
    }
  }

  const addComment = async()=>{
    if(!comment){
      return;
    }
    try {
      const {data} = await axios.post(`api/v1/comment/add`, {description: comment, postId: _id, userId: user._id});
      const {comments} = data;
      setPostComments(comments);
    } catch (error) {
      console.log(error);
    }

    setComment('');
  }
  
  useEffect(()=>{
      // getUser(postedBy);
      getPostUser();
      getPostComments();
      // setPostUser(postPostedBy);

      if(upvotes.includes(user._id)){
        setUpvoted(true);
      }
      if(downvotes.includes(user._id)){
        setDownvoted(true);
      }
      if(savedBy.includes(user._id)){
        setSaved(true);
      }
      if(reportedPosts.includes(_id)){
        setReported(true);
      }

      if(user._id.toString() === postedBy){
        setAllowDelete(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(()=>{
      // getSavedPosts();
      setUpvoted(false);
      if(upvotes.includes(user._id)){
        setUpvoted(true);
      }
      setDownvoted(false);
      if(downvotes.includes(user._id)){
        setDownvoted(true);
      }
      setSaved(false);
      if(savedBy.includes(user._id)){
        setSaved(true);
      }
      setReported(false);
      if(reportedPosts.includes(_id)){
        setReported(true);
      }

      // setAllowDelete(false);
      // if(user._id.toString === postUser?._id._toString()){
      //   setAllowDelete(true);
      // }
      // setPostUser(postPostedBy);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upvotes, downvotes, savedBy, reportedPosts]);
    
    const handleUpvote= ()=>{
      upvotePost(_id);
      // getSavedPosts();
    }
    const handleDownvote=()=>{
      downvotePost(_id);
      // getSavedPosts();
    }
    const handleDelete = ()=>{
      deletePost(_id);
      // getSavedPosts();
    }
    const handleSave = ()=>{
      console.log(user);
      savePost(_id);
      // getSavedPosts();
    }

    const handleSubmitReport = ()=>{
      const report = {concern, reportedUser: postUser._id, reportedPost:_id, reportedBy: user._id, reportedSubgreddiiit: subgreddiiitId};
      reportPost(report);
      setShowReport(false);
      setReported(true);
    }

    if(isLoadingPost){
      return <Loading center="center"/>
    }

  return (
    <Wrapper>
      <div className='post-container'>
        <div className='post-header'>
          <div className='title'>
            {title}
          </div>
          {del && 
          <div className='delete' >
            <button className='btn-no-style' onClick={handleDelete}>
              <MdOutlineDeleteOutline size={28} del='del'/>
            </button>
          </div>
          }
        </div>
        {/* <div className='img'>
          <img src={imgPath} />
        </div> */}
        <div >
          <div className='description'>
            {description}
          </div>
          <div className='posted-by'>
              <span>
                posted by: {postUser.username}
              </span>
              {
                user._id !== postUser._id &&
                <button className='btn btn-follow' onClick={()=>addFollower(postUser._id)}>
                  follow
                </button>
              }
          </div>
        </div>
        <div className='votes'>
          <button className={upvoted ?'btn-vote upvoted': 'btn-vote'} onClick={handleUpvote}>{upvoted?"Upvoted": "Upvote"} ({upvotes.length})</button>
          <button className={downvoted ?'btn-vote downvoted': 'btn-vote'} onClick={handleDownvote}>{downvoted?"Downvoted":"Downvote"} ({downvotes.length})</button>
        </div>
        <div className='other'>
          <button className={showComments ? 'btn-other comments saved' :'btn-other comments'} onClick={()=>setShowComments(!showComments)}>Comments({postComments.length})</button>
          <button className={saved ?'btn-other save saved': 'btn-other save'} onClick={handleSave}>{saved?"Saved":"Save"}</button>
          <button className={reported ?'btn-other report downvoted': 'btn-other report'} disabled={reported} onClick={()=>setShowReport(!showReport)}>{reported ?"Reported": "Report"}</button>
        </div>
        {showReport &&
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
        }
        {showComments &&
          <div className='comments-container'>
            <h5 className='report-header'>
              Comments ({postComments.length})
            </h5>
            <div className='comment-header form-row'>
              <div >
                {/* <label htmlFor="concern" className='form-label'>Concern</label> */}
                <input type="text" value={comment} name='comment' onChange={(e)=>setComment(e.target.value)} className='form-input'></input>   
              </div>
              <div className='btn-add-container'>
                <button className='btn btn-add' onClick={addComment}>
                  Add
                </button>
              </div>
            </div>
            <div className='all-comments'>
              {/* <Comment /> */}
              {postComments.map((comment)=>{
                return <Comment {...comment} likeComment={likeComment} deleteComment={deleteComment} allowDelete={allowDelete}/>
              })}
            </div>
          </div>
        }
      </div>
    </Wrapper>
  )
}

export default Post
