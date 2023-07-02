import Post from "../models/Post.js"
import User from "../models/User.js"
import Subgreddiiits from "../models/Subgreddiiits.js"
import Report from "../models/Report.js"
import {StatusCodes} from 'http-status-codes'
import {BadRequestError} from "../errors/index.js"

const createPost = async (req, res)=>{
    const {title, description, imgPath, subgreddiiitId} = req.body;
    const {userId} = req.user;
    const subgreddiiit = await Subgreddiiits.findById(subgreddiiitId);
    if(!subgreddiiit){
        throw new BadRequestError('Something went wrong! Try again later');
    }
    const user = await User.findById(userId);
    if(!user){
        throw new BadRequestError('Something went wrong! Try again later')
    }

    //check once this creation

    const post = await Post.create({
        title, 
        description, 
        imgPath,
        postedBy: user,
        postedIn: subgreddiiit,
    })

    subgreddiiit.posts.push(post._id);
    await subgreddiiit.save();

    user.posts.push(post._id);
    await user.save();
    await post.save();

    // maybe return all the posts instead
    const posts = await Post.find({postedIn: subgreddiiitId});
    // res.status(StatusCodes.OK).json({posts});
    res.status(StatusCodes.CREATED).json({posts});
}

const getAllPosts = async (req, res)=>{
    const posts = await Post.find();
    res.status(StatusCodes.OK).json({posts});
}

const getPost = async (req, res)=>{
    const post = await Post.findById(req.params.id);
    res.status(StatusCodes.OK).json({post});
}

const getSubGreddiiitPosts = async(req, res)=>{
    const posts = await Post.find({postedIn: req.params.id});
    res.status(StatusCodes.OK).json({posts});
}

const deletePost = async (req, res)=>{
    const postId = req.params.id;
    const post = await Post.findById(postId);
    
    const allUsers = await User.find();
    allUsers.forEach(async (user)=>{
        if(user.savedPosts.includes(postId)){
            const idx =user.savedPosts.indexOf(postId);
            user.savedPosts.splice(idx, 1);
        }
        if(user.upvotedPosts.includes(postId)){
            const idx = user.upvotedPosts.indexOf(postId);
            user.upvotedPosts.splice(idx, 1);
        }
        if(user.downvotedPosts.includes(postId)){
            const idx = user.downvotedPosts.indexOf(postId);
            user.downvotedPosts.splice(idx, 1);
        }
        await user.save();
    })
    
    const allReports = await Report.find();
    // allReports.forEach(async (report)=>{
    //     if(report.reportedPost === postId){
    //         await Report.findByIdAndDelete(report._id);
    //     }
    // })

    for (const report of allReports){
        if(report.reportedPost.toString() === postId.toString()){
            await Report.findByIdAndDelete(report._id);
        }
    }
    
    // check once
    const subgreddiiitId = post.postedIn;
    const subgreddiiit = await Subgreddiiits.findById(subgreddiiitId);
    const idx = subgreddiiit.posts.indexOf(postId);
    subgreddiiit.posts.splice(idx, 1);
    await subgreddiiit.save();

    await Post.findByIdAndDelete(postId)

    const posts = await Post.find({postedIn: subgreddiiitId});

    const reports = await Report.find({reportedSubgreddiiit: subgreddiiitId});
    res.status(StatusCodes.OK).json({posts, reports});    

    // res.status(StatusCodes.OK).json({msg: 'the post has been deleted'});
}

const upvotePost = async (req, res)=>{
    const {id:postId} = req.params
    const {userId} = req.user;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if(!post.upvotes.includes(userId)){
        post.upvotes.push(userId);
        await post.save();
        user.upvotedPosts.push(postId);
        await user.save();

        const posts = await Post.find({postedIn: post.postedIn});
        const savedPosts = await Post.find({_id: {$in: user.savedPosts}});
        res.status(StatusCodes.OK).json({posts, savedPosts});   

        // res.status(StatusCodes.OK).json({msg:'The post has been upvoted'});
        return;
    }
    let idx = post.upvotes.indexOf(userId);
    post.upvotes.splice(idx, 1);
    await post.save();

    idx = user.upvotedPosts.indexOf(postId);
    user.upvotedPosts.splice(idx, 1);
    await user.save();

    const posts = await Post.find({postedIn: post.postedIn});
    const savedPosts = await Post.find({_id: {$in: user.savedPosts}});
    res.status(StatusCodes.OK).json({user, savedPosts, posts});    

    // res.status(StatusCodes.OK).json({msg: "Upvote from the post has been removed "});
}

const downvotePost = async (req, res)=>{
    const {id:postId} = req.params
    const {userId} = req.user;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if(!post.downvotes.includes(userId)){
        post.downvotes.push(userId);
        await post.save()
        user.downvotedPosts.push(postId);
        await user.save();

        const posts = await Post.find({postedIn: post.postedIn});
        const savedPosts = await Post.find({_id: {$in: user.savedPosts}});
        res.status(StatusCodes.OK).json({posts, savedPosts});  

        // res.status(StatusCodes.OK).json({msg: 'The post has been downvoted'});
        return;
    }
    let idx = post.downvotes.indexOf(userId);
    post.downvotes.splice(idx, 1);
    await post.save();

    idx = user.downvotedPosts.indexOf(postId);
    user.downvotedPosts.splice(idx, 1);
    await user.save();

    const posts = await Post.find({postedIn: post.postedIn});
    const savedPosts = await Post.find({_id: {$in: user.savedPosts}});
    res.status(StatusCodes.OK).json({user, savedPosts, posts});  

    // res.status(StatusCode.OK).json({msg: 'Downvote from the post has been removed'});
}

const getUserPosts = async (req, res)=>{
    const posts = await Post.find({postedBy: req.params.id});
    res.status(StatusCodes.OK).json({posts});
}

const savePost = async(req, res)=>{
    const {userId} = req.user;
    const {id: postId} = req.params;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if(user.savedPosts.includes(postId)){
        let idx = user.savedPosts.indexOf(postId);
        user.savedPosts.splice(idx, 1);
        await user.save();

        idx = post.savedBy.indexOf(userId);
        post.savedBy.splice(idx, 1);
        await post.save();

        const posts = await Post.find({postedIn: post.postedIn});

        // const user = await User.findById(userId);
        // const savedPostsUser = user.savedPosts;
        const savedPosts = await Post.find({_id: {$in: user.savedPosts}});
        res.status(StatusCodes.OK).json({user, savedPosts, posts}); 
        // res.status(StatusCodes.OK).json({msg: 'The post have be removed from saved posts'});
        return;
    }
    user.savedPosts.push(postId);
    await user.save();

    post.savedBy.push(userId);
    await post.save();

    const posts = await Post.find({postedIn: post.postedIn});
    const savedPosts = await Post.find({_id: {$in: user.savedPosts}});
    res.status(StatusCodes.OK).json({user, savedPosts, posts});    

    // res.status(StatusCodes.OK).json({user});
    // res.status(StatusCodes.OK).json({msg: 'The post has been added to saved posts'});
}

const getSavedPosts = async(req, res)=>{
    const {userId} = req.user;
    const user = await User.findById(userId);
    const savedPosts = user.savedPosts;
    const posts = await Post.find({_id: {$in: user.savedPosts}});
    res.status(StatusCodes.OK).json({posts});
}

export {
    createPost,
    getAllPosts,
    getPost,
    getSubGreddiiitPosts,
    deletePost,
    upvotePost,
    downvotePost,
    getUserPosts,
    savePost,
    getSavedPosts,
}