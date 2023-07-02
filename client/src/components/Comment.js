import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/Post'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri';
// import {BiUserCircle} from 'react-icons/bi'
import axios from 'axios';
import { useAppContext } from '../context/appContext';

const Comment = ({_id, description, commentedBy, likes, likeComment, deleteComment, allowDelete}) => {

  const [commentUser, setCommentUser] = useState({});
  const [liked, setLiked] = useState(false);
  const {user} = useAppContext();

  const getCommentUser = async()=>{
    try {
        const {data} = await axios.get(`api/v1/user/singleUser/${commentedBy}`)
        const {user} = data;
        setCommentUser(user);
    } catch(error){
        console.log(error);
    }
  }

  useEffect(()=>{
    getCommentUser();

    if(likes.includes(user._id)){
      setLiked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    setLiked(false);
    if(likes.includes(user._id)){
      setLiked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  const handleLike = ()=>{
    likeComment(_id);
    setLiked(!liked);
  }

  return (
    <Wrapper>
    <div className='comment'>
        <div className='col-1'>
            <div className='commented-by'><span className='username'>{commentUser?.username}:</span> </div>
            <div className='comment-description'><span>{description}</span></div>
        </div>
        <div className='col-2'>
            <div className='like'><button className='like-comment no-style' onClick={handleLike}><span className='like-icon'>{!liked ? <AiOutlineHeart/>:<AiFillHeart/>} </span><span className='number'>{likes.length}</span></button></div>
            {allowDelete &&
              <div className='delete'><button className='delete-comment no-style' onClick={()=>deleteComment(_id)}><RiDeleteBinLine/></button></div>
            }
        </div>
    </div>
    </Wrapper>
  )
}

export default Comment
