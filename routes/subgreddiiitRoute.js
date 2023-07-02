import express from 'express'
const router = express.Router();
import authenticateUser from '../middleware/auth.js'
import {
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
    acceptJoinRequest,
    rejectJoinRequest,
    blockUser,
    getFollowingSubgreddiiits,
    getNonFollowingSubgreddiiits,
} from '../controllers/subgreddiiitController.js'


router.route('/singleSubgreddiiit/:id').get(getSubgreddiiit);
router.route('/mySubgreddiiits').get(authenticateUser, getMySubgreddiiits);
router.route('/allSubgreddiiits').get(getAllSubgreddiiits);
router.route('/followingSubgreddiiits').get(authenticateUser, getFollowingSubgreddiiits);
router.route('/nonFollowingSubgreddiiits').get(authenticateUser, getNonFollowingSubgreddiiits);
router.route('/create').post(authenticateUser, createSubgreddiiit);
router.route('/update/:id').patch(authenticateUser, updateSubgreddiiit);
router.route('/delete/:id').delete(authenticateUser, deleteSubgreddiiit);
router.route('/moderators/:id').get(getSubgreddiiitModerators)
router.route('/followers/:id').get(getSubgreddiiitFollowers)
router.route('/blocked/:id').get(getSubgreddiiitBlocked);
router.route('/joinRequests/:id').get(getSubgreddiiitJoinRequests)
router.route('/posts/:id').get(getSubgreddiiitPosts);
router.route('/join/:id').patch(authenticateUser, joinSubgreddiiit);
router.route('/leave/:id').patch(authenticateUser, leaveSubgreddiiit);
router.route('/accept/:userId/:id').patch(authenticateUser, acceptJoinRequest);
router.route('/reject/:userId/:id').patch(authenticateUser, rejectJoinRequest);
router.route('/block/:userId/:id').patch(authenticateUser, blockUser);


export default router