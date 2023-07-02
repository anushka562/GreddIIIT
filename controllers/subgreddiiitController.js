import Subgreddiiits from "../models/Subgreddiiits.js";
import Post from "../models/Post.js";
import Report from '../models/Report.js'
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";

const getSubgreddiiit = async (req, res)=>{
    const {id} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);
    if(!subgreddiiit){
        throw new BadRequestError('no such subgreddiiit exists');
    }

    res.status(StatusCodes.OK).json({subgreddiiit});
}

const getMySubgreddiiits = async (req, res)=>{
    let mySubgreddiiits = [];
    const {userId} = req.user;
    const allSubgreddiiits = await Subgreddiiits.find();
    mySubgreddiiits = allSubgreddiiits.filter((subgreddiiit)=>{
        return subgreddiiit.moderators.includes(userId);
    })

    res.status(StatusCodes.OK).json({mySubgreddiiits});
}

const getFollowingSubgreddiiits = async(req, res)=>{
    const {search, tags, sort} = req.query;
    console.log(sort);

    let tagsArray=[];
    if(tags){
        tagsArray = tags.split(',');
    }

    let queryObject = {}
    if(search){
        queryObject.name = {$regex: search, $options: 'i'};
    }
    if(tags){
        queryObject.tags = {$all: tagsArray};
    }
    // console.log(queryObject);

    let subgreddiiits =[];
    let allSubgreddiiits = [];
    const {userId} = req.user;
    if(queryObject){
        allSubgreddiiits = await Subgreddiiits.find(queryObject);
    }
    else{
        allSubgreddiiits = await Subgreddiiits.find();

    }
    // console.log(allSubgreddiiits);
    subgreddiiits = allSubgreddiiits.filter((subgreddiiit)=> subgreddiiit.followers.includes(userId));

    // console.log(subgreddiiits);
    if(sort === 'latest'){
        subgreddiiits = subgreddiiits.sort((s1, s2)=> (s1.createdAt < s2.createdAt) ? 1 : (s1.createdAt > s2.createdAt) ? -1 : 0);
    }
    if(sort === 'oldest'){
        subgreddiiits = subgreddiiits.sort((s1, s2)=> (s1.createdAt > s2.createdAt) ? 1 : (s1.createdAt < s2.createdAt) ? -1 : 0);
    }
    if(sort === 'a-z'){
        subgreddiiits = subgreddiiits.sort(function(s1, s2){ 
            const nameA = s1.name.toUpperCase();
            const nameB = s2.name.toUpperCase();
            if(nameA < nameB){
                return -1;
            }
            if(nameA > nameB){
                return 1;
            }
            return 0;
        });
    }
    if(sort === 'z-a'){
        subgreddiiits = subgreddiiits.sort(function(s1, s2){ 
            const nameA = s1.name.toUpperCase();
            const nameB = s2.name.toUpperCase();
            if(nameA > nameB){
                return -1;
            }
            if(nameA < nameB){
                return 1;
            }
            return 0;
        });
    }
    if(sort === 'most followed'){
        subgreddiiits = subgreddiiits.sort((s1, s2)=> (s1.followers.length < s2.followers.length) ? 1 : (s1.followers.length > s2.followers.length) ? -1 : 0);
    }
    if(sort === 'least followed'){
        subgreddiiits = subgreddiiits.sort((s1, s2)=> (s1.followers.length > s2.followers.length) ? 1 : (s1.followers.length < s2.followers.length) ? -1 : 0);
    }

    res.status(StatusCodes.OK).json({subgreddiiits})
}

const getNonFollowingSubgreddiiits = async(req, res)=>{
    const {search, tags, sort} = req.query;

    let tagsArray;
    if(tags){
        tagsArray = tags.split(',');
    }

    let queryObject = {}
    if(search){
        queryObject.name = {$regex: search, $options: 'i'};
    }
    if(tags){
        queryObject.tags = {$all: tagsArray};
    }

    let subgreddiiits = [];
    let allSubgreddiiits = [];
    const {userId} = req.user;
    if(queryObject){
        allSubgreddiiits = await Subgreddiiits.find(queryObject);
    }
    else{
        allSubgreddiiits = await Subgreddiiits.find();

    }
    subgreddiiits = allSubgreddiiits.filter((subgreddiiit)=> !subgreddiiit.followers.includes(userId) && !subgreddiiit.blockedFollowers.includes(userId))
    if(sort === 'latest'){
        subgreddiiits = subgreddiiits.sort((s1, s2)=> (s1.createdAt < s2.createdAt) ? 1 : (s1.createdAt > s2.createdAt) ? -1 : 0);
    }
    if(sort === 'oldest'){
        subgreddiiits = subgreddiiits.sort((s1, s2)=> (s1.createdAt > s2.createdAt) ? 1 : (s1.createdAt < s2.createdAt) ? -1 : 0);
    }
    if(sort === 'a-z'){
        subgreddiiits = subgreddiiits.sort(function(s1, s2){ 
            const nameA = s1.name.toUpperCase();
            const nameB = s2.name.toUpperCase();
            if(nameA < nameB){
                return -1;
            }
            if(nameA > nameB){
                return 1;
            }
            return 0;
        });
    }
    if(sort === 'z-a'){
        subgreddiiits = subgreddiiits.sort(function(s1, s2){ 
            const nameA = s1.name.toUpperCase();
            const nameB = s2.name.toUpperCase();
            if(nameA > nameB){
                return -1;
            }
            if(nameA < nameB){
                return 1;
            }
            return 0;
        });
    }
    if(sort === 'most followed'){
        subgreddiiits = subgreddiiits.sort((s1, s2)=> (s1.followers.length < s2.followers.length) ? 1 : (s1.followers.length > s2.followers.length) ? -1 : 0);
    }
    if(sort === 'least followed'){
        subgreddiiits = subgreddiiits.sort((s1, s2)=> (s1.followers.length > s2.followers.length) ? 1 : (s1.followers.length < s2.followers.length) ? -1 : 0);
    }

    res.status(StatusCodes.OK).json({subgreddiiits});
}

const getAllSubgreddiiits = async (req, res)=>{
    const subgreddiiits = await Subgreddiiits.find();
    res.status(StatusCodes.OK).json({subgreddiiits});
}

const createSubgreddiiit = async (req, res)=>{
    const {name, description, tags, bannedKeywords, imgPath,}= req.body;
    const {userId} = req.user;
    const user = await User.findById(userId);

    let tagsArray = [];
    if(tags){
        tagsArray = tags.split(",");
    }
    let bannedKeywordsArray = [];
    if(bannedKeywords){
        bannedKeywordsArray = bannedKeywords.split(",");
    }

    const subgreddiiit = await Subgreddiiits.create({
        name, 
        description, 
        imgPath, 
        tags: tagsArray,
        bannedKeywords: bannedKeywordsArray,
        moderators: [userId],
        followers: [userId],
    })

    user.mySubgreddiiits.push(subgreddiiit._id);
    await user.save();

    let mySubgreddiiits = [];
    const allSubgreddiiits = await Subgreddiiits.find();
    mySubgreddiiits = allSubgreddiiits.filter((subgreddiiit)=>{
        return subgreddiiit.moderators.includes(userId);
    })

    res.status(StatusCodes.CREATED).json({mySubgreddiiits});
}

const updateSubgreddiiit = async (req, res)=>{
    const {id} = req.params;
    const {name, description, imgPath} = req.body;
    const subgreddiiit = Subgreddiiits.findById(id);

    subgreddiiit.name = name;
    subgreddiiit.description = description;
    subgreddiiit.imgPath = imgPath;

    await subgreddiiit.save();
    res.status(StatusCodes.OK).json({msg: 'Subgreddiiit has been updated'})
}

const deleteSubgreddiiit = async (req, res)=>{
    const {id} = req.params;
    // const subgreddiiit = await Subgreddiiits.findById(id);

    const allUsers = await User.find();
    allUsers.forEach(async (user)=>{
        if(user.mySubgreddiiits.includes(id)){
            let idx = user.mySubgreddiiits.indexOf(id);
            user.mySubgreddiiits.splice(idx, 1);
            await user.save();
        }
    })

    // what about posts
    const allPosts = await Post.find({postedIn: id});
    allPosts.forEach(async (post)=>{
        const postId = post._id;
        const allUsers = await User.find();
        allUsers.forEach(async (user)=>{
            if(user.savedPosts.includes(postId)){
                const idx =user.savedPosts.indexOf(postId);
                user.savedPosts.splice(idx, 1);
                // user.savedPosts.pull(idx);
                await user.save()
            }
            if(user.upvotedPosts.includes(postId)){
                const idx = user.upvotedPosts.indexOf(postId);
                user.upvotedPosts.splice(idx, 1);
                // user.upvotedPosts.pull(idx);
                await user.save()
            }
            if(user.downvotedPosts.includes(postId)){
                const idx = user.downvotedPosts.indexOf(postId);
                user.downvotedPosts.splice(idx, 1);
                // user.downvotedPosts.pull(idx);
                await user.save()
            }
        })

        const allReports = await Report.find();
        allReports.forEach(async (report)=>{
            if(report.reportedPost === postId){
                await Report.findByIdAndDelete(report._id);
            }
        })

        await Post.findByIdAndDelete(postId);
    })

    await Subgreddiiits.findByIdAndDelete(id);

    let mySubgreddiiits = [];
    const {userId} = req.user;
    const allSubgreddiiits = await Subgreddiiits.find();
    allSubgreddiiits.forEach((subgreddiiit)=>{
        if(subgreddiiit.moderators.includes(userId)){
            mySubgreddiiits.push(subgreddiiit);
        }
    })
    console.log(mySubgreddiiits);
    res.status(StatusCodes.OK).json({mySubgreddiiits});

    // res.status(StatusCodes.OK).json({msg: "Subgreddit has been deleted"})
}

const getSubgreddiiitModerators = async (req, res)=>{
    const {id} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);

    let moderators = await User.find({_id: {$in: subgreddiiit.moderators}});
    moderators = moderators.map((moderator)=>{
        const {_id, firstName, lastName, username} = moderator;
        return {_id, firstName, lastName, username};
    })

    res.status(StatusCodes.OK).json({moderators});

}
const getSubgreddiiitFollowers = async (req, res)=>{
    const {id} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);

    let followers = await User.find({_id: {$in: subgreddiiit.followers}});
    followers = followers.map((follower)=>{
        const {_id, firstName, lastName, username} = follower;
        return {_id, firstName, lastName, username};
    })

    res.status(StatusCodes.OK).json({followers});

}
const getSubgreddiiitBlocked = async (req, res)=>{
    const {id} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);

    let blockedFollowers = await User.find({_id: {$in: subgreddiiit.blockedFollowers}});
    blockedFollowers = blockedFollowers.map((blockedFollower)=>{
        const {_id, firstName, lastName, username} = blockedFollower;
        return {_id, firstName, lastName, username};
    })

    res.status(StatusCodes.OK).json({blockedFollowers});
}

const getSubgreddiiitJoinRequests = async (req, res)=>{
    const {id} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);

    let joinRequests = await User.find({_id: {$in: subgreddiiit.joinRequests}});
    joinRequests = joinRequests.map((joinRequest)=>{
        const {_id, firstName, lastName, username} = joinRequest;
        return {_id, firstName, lastName, username};
    })
    res.status(StatusCodes.OK).json({joinRequests});
}

const getSubgreddiiitPosts = async (req, res)=>{
    const {id} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);

    let posts = await Post.find({_id: {$in: subgreddiiit.posts}});
    // posts = posts.map((post)=>{
    //     // const {_id, title, description, imgPath} = post;
    //     return post;
    // })
    res.status(StatusCodes.OK).json({posts});
}

const joinSubgreddiiit = async (req, res)=>{
    const {id} = req.params;
    const {userId} = req.user;  
    const subgreddiiit = await Subgreddiiits.findById(id);

    if(subgreddiiit.joinRequests.includes(userId)){
        res.status(StatusCodes.OK).json({msg: 'You have already requested to join this subgreddiiit'});
        return;
    }

    subgreddiiit.joinRequests.push(userId);
    await subgreddiiit.save();
    res.status(StatusCodes.OK).json({msg: 'The join request has been sent'});
}

const leaveSubgreddiiit = async (req, res)=>{
    const {id} = req.params;
    const {userId} = req.user;
    const subgreddiiit = await Subgreddiiits.findById(id);

    if(subgreddiiit.followers.includes(userId)){
        subgreddiiit.followers.pull(userId);
    } 
    if(subgreddiiit.leftUsers.includes(userId)){
        subgreddiiit.leftUsers.push(userId);
    }
    await subgreddiiit.save();

    const allSubgreddiiits = await Subgreddiiits.find();
    const followingSubgreddiiits = allSubgreddiiits.filter((subgreddiiit)=> subgreddiiit.followers.includes(userId));
    const nonFollowingSubgreddiiits = allSubgreddiiits.filter((subgreddiiit)=> !subgreddiiit.followers.includes(userId))
    res.status(StatusCodes.OK).json({msg: 'You have left the subgreddiiit', followingSubgreddiiits, nonFollowingSubgreddiiits});

}

const addPostToSubgreddiiit = async (req, res)=>{
    res.send("add post to a subgreddiiit");
}
const removePostFromSubgreddiiit = async (req, res)=>{
    res.send("remove post from a subgreddiiit");
}
const acceptJoinRequest = async (req, res)=>{
    const {id, userId} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);

    subgreddiiit.followers.push(userId);
    subgreddiiit.joinRequests.pull(userId);
    await subgreddiiit.save();

    let joinRequests = await User.find({_id: {$in: subgreddiiit.joinRequests}});
    joinRequests = joinRequests.map((joinRequest)=>{
        const {_id, firstName, lastName, username} = joinRequest;
        return {_id, firstName, lastName, username};
    })

    let followers = await User.find({_id: {$in: subgreddiiit.followers}});
    followers = followers.map((follower)=>{
        const {_id, firstName, lastName, username} = follower;
        return {_id, firstName, lastName, username};
    })

    res.status(StatusCodes.OK).json({msg: 'the user has been accepted to the subgreddiiit', joinRequests, followers});
}
const rejectJoinRequest = async (req, res)=>{
    const {id, userId} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);

    subgreddiiit.joinRequests.pull(userId);
    await subgreddiiit.save();

    let joinRequests = await User.find({_id: {$in: subgreddiiit.joinRequests}});
    joinRequests = joinRequests.map((joinRequest)=>{
        const {_id, firstName, lastName, username} = joinRequest;
        return {_id, firstName, lastName, username};
    })

    let followers = await User.find({_id: {$in: subgreddiiit.followers}});
    followers = followers.map((follower)=>{
        const {_id, firstName, lastName, username} = follower;
        return {_id, firstName, lastName, username};
    })

    res.status(StatusCodes.OK).json({msg: 'the user has been removed from the subgreddiiit', joinRequests, followers});

}
const blockUser = async (req, res)=>{
    const {id, userId} = req.params;
    const subgreddiiit = await Subgreddiiits.findById(id);

    if(subgreddiiit.followers.includes(userId)){
        subgreddiiit.followers.pull(userId);
    }
    subgreddiiit.blockedFollowers.push(userId);

    let posts = await Post.find({postedIn: id});
    for(const post of posts){
        if(post.postedBy.toString() === userId){
            subgreddiiit.posts.pull(post._id);
            await Post.findByIdAndDelete(post._id);
        }
    }
    posts = await Post.find({postedIn: id});
    
    let reports = await Report.find({reportedSubgreddiiit: id});
    for(const report of reports){
        if(report.reportedUser.toString() === userId){
            await Report.findByIdAndDelete(report._id);
        }
    }
    reports = await Report.find({reportedSubgreddiiit: id});
    
    await subgreddiiit.save();

    const followers = await User.find({_id : {$in: subgreddiiit.followers}});
    const blockedFollowers = await User.find({_id: {$in: subgreddiiit.blockedFollowers}});
    res.status(StatusCodes.OK).json({followers, blockedFollowers, posts, reports});
}

export {
    getSubgreddiiit,
    getMySubgreddiiits,
    getAllSubgreddiiits,
    createSubgreddiiit,
    updateSubgreddiiit,
    deleteSubgreddiiit,
    getSubgreddiiitModerators,
    getSubgreddiiitFollowers,
    getSubgreddiiitBlocked,
    getSubgreddiiitJoinRequests,
    getSubgreddiiitPosts,
    joinSubgreddiiit,
    leaveSubgreddiiit,
    addPostToSubgreddiiit,
    removePostFromSubgreddiiit,
    acceptJoinRequest,
    rejectJoinRequest,
    blockUser,
    getFollowingSubgreddiiits,
    getNonFollowingSubgreddiiits,
}