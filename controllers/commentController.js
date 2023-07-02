import Comment from '../models/Comments.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnAuthenticatedError} from '../errors/index.js'

const addComment = async (req, res)=>{
    const {description, postId, userId} = req.body;
    // const {userId} = req.user;
    const comment = await Comment.create({
        description, 
        commentedBy: userId,
        commentedIn: postId,
    })

    const comments = await Comment.find({commentedIn: postId});

    res.status(StatusCodes.CREATED).json({comments});
}

const getPostComments = async(req, res)=>{
    const {postId} = req.params;
    const comments = await Comment.find({commentedIn: postId});

    res.status(StatusCodes.OK).json({comments});
}

const likeComment = async(req, res)=>{
    // const {userId} = req.user;
    const {id, userId} = req.params;

    const comment = await Comment.findById(id);

    if(comment.likes.includes(userId)){
        comment.likes.pull(userId);
    }
    else{
        comment.likes.push(userId);
    }

    await comment.save();

    const comments = await Comment.find({commentedIn: comment.commentedIn});

    res.status(StatusCodes.OK).json({comments});
}

const deleteComment = async(req, res)=>{
    const {id} = req.params;

    const comment = await Comment.findById(id);
    const postId = comment.commentedIn;

    await Comment.findByIdAndDelete(id);
    const comments = await Comment.find({commentIn: postId});

    res.status(StatusCodes.OK).json({comments});
}

export {
    addComment,
    likeComment,
    getPostComments,
    deleteComment,
};
