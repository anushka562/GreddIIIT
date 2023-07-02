import express from 'express'
const router = express.Router();
import authenticateUser from '../middleware/auth.js'

import {getUser, updateUser, getFollowers, getFollowing, removeFollower, addFollower, unfollowFollowing, getAllUser} from '../controllers/userController.js'

router.route('/allUsers').get(getAllUser);
router.route('/singleUser/:id').get(getUser);
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/followers').get(authenticateUser, getFollowers);
router.route('/following').get(authenticateUser, getFollowing);
router.route('/removeFollower').patch(authenticateUser, removeFollower);                                        
router.route('/addFollower').patch(authenticateUser, addFollower);                                        
router.route('/unfollowFollowing').patch(authenticateUser, unfollowFollowing);

export default router