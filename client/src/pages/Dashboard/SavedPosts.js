import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/SavedPost'
import { useAppContext } from '../../context/appContext'
import { Loading, Alert, Post } from '../../components';

const SavedPosts = () => {

  const {isLoading, getSavedPosts, savedPosts, showAlert} = useAppContext();

  useEffect(()=>{
    getSavedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div className='header'>
        <h4>Saved Posts</h4>
      </div>
      <div className='post-container'>
          {isLoading ?
            <Loading center='center'/>
            :
            <div className='posts'>
              {showAlert && <Alert/>}
              {savedPosts.length>0 && 
                savedPosts.map((post)=>{
                  return <Post key={post._id} {...post}/>
                })
              }
            </div>
          }
      </div>
    </Wrapper>
  )
}

export default SavedPosts
