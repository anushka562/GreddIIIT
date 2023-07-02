import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnAuthenticatedError} from '../errors/index.js'


const register = async (req, res, next)=>{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !email || !password){
        throw new BadRequestError('Please provide all values!');
    }

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        throw new BadRequestError('Email already exists');
    }

    const user = await User.create({firstName, lastName, email, password});
    const token = user.createJWT();
    // res.status(StatusCodes.CREATED).json({user:{_id: user._id, email: user.email, lastName: user.lastName, firstName: user.firstName, age: user.age, username: user.username, contactNumber: user.contactNumber, following: user.following, followers: user.followers}, token});
    res.status(StatusCodes.CREATED).json({user, token});

}
const login = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide all values!');
    }

    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw new UnAuthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect  = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({user, token})

}


export {register, login,};