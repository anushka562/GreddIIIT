import User from '../models/User.js'
import StatusCodes from 'http-status-codes'
import {BadRequestError} from '../errors/index.js'

const getAllUser = async (req, res)=>{
    const users = await User.find();
    res.status(StatusCodes.OK).json({users});

}

const getUser = async (req, res)=>{
    const {id:userId} = req.params;
    try{
        console.log(userId);
        const user = await User.findById(userId);
        if(!user){
            throw new BadRequestError(`user with id ${userId} does not exists`);
        }
        res.status(StatusCodes.OK).json({user});
    } catch(error){
        throw new BadRequestError(`user with id ${userId} does not exists`);
    }
}

const updateUser = async (req, res)=>{
    const {email, firstName, lastName, username, age, contactNumber} = req.body;
    if(!email || !firstName || !lastName || !username || !age || !contactNumber){
        throw new BadRequestError('Please provide all values!');
    }

    const user = await User.findOne({_id: req.user.userId});
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.age = age;
    user.contactNumber = contactNumber;
    await user.save();

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user, 
        token
    })
}

const getFollowers = async (req, res)=>{
    const {userId} = req.user;
    const user = await User.findById(userId);
    let followers = await User.find({_id: { $in: user.followers}});

    if(!user || !followers){
        throw new BadRequestError(`Couldn't complete the action`);
    }

    followers = followers.map((follower)=>{
        const {_id, firstName, lastName, username} = follower;
        return {_id, firstName, lastName, username};
    })

    console.log(followers);
    res.status(StatusCodes.OK).json({user, followers});

}

const getFollowing = async (req, res)=>{
    const {userId} = req.user;
    const user = await User.findById(userId);
    let followings = await User.find({_id: { $in: user.following}});

    if(!user || !followings){
        throw new BadRequestError(`Couldn't complete the action`);
    }

    followings = followings.map((following)=>{
        const {_id, firstName, lastName, username} = following;
        return {_id, firstName, lastName, username};
    })

    console.log(followings);
    res.status(StatusCodes.OK).json({user, followings});
}

const removeFollower = async (req, res)=>{
    const {userId} = req.user;
    const {followerId} = req.query;
    console.log(userId, followerId);

    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if(!user || !follower){
        throw new BadRequestError(`Couldn't complete the action`)
    }

    if(!user.followers.includes(follower._id)){
        throw new BadRequestError(`Couldn't complete the action`)
    }
    const idx = user.followers.indexOf(follower._id);
    user.followers.splice(idx, 1);

    const idx2 = follower.following.indexOf(user._id);
    follower.following.splice(idx2, 1);

    await user.save();
    await follower.save();
    res.status(StatusCodes.OK).json({user, follower});
}

const addFollower = async (req, res)=>{
    // console.log(req.query);
    const {userId} = req.user;
    const {followerId} = req.query;
    console.log(userId, followerId);
    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if(!user || !follower){
        throw new BadRequestError(`Couldn't complete the action`)
    }

    if(user.following.includes(follower._id)){
        throw new BadRequestError(`You already follow this user`);
    } 
    user.following.push(follower._id);
    follower.followers.push(user._id);

    await user.save();
    await follower.save();
    console.log(user, follower);
    res.status(StatusCodes.OK).json({user, follower});
        
}

const unfollowFollowing = async (req, res)=>{
    const {userId} = req.user;
    const {followingId} = req.query;
    console.log(userId, followingId);

    const user = await User.findById(userId);
    const following = await User.findById(followingId);

    if(!user || !following){
        throw new BadRequestError(`Couldn't complete the action`)
    }

    if(!user.following.includes(following._id)){
        throw new BadRequestError(`Couldn't complete the action`)
    }
    const idx = user.following.indexOf(following._id);
    user.following.splice(idx, 1);

    const idx2 = following.followers.indexOf(user._id);
    following.followers.splice(idx2, 1);

    await user.save();
    await following.save();
    res.status(StatusCodes.OK).json({user, following});
}

export {
    getAllUser,
    getUser, 
    updateUser,
    getFollowers,
    getFollowing,
    removeFollower,
    addFollower,
    unfollowFollowing,
}