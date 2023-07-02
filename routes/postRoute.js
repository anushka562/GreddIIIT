import express from "express"
const router = express.Router();
import authenticateUser from '../middleware/auth.js'

import {
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
} from "../controllers/postController.js"

router.route("/create").post(authenticateUser, createPost);
router.route("/singlePost/:id").get(getPost);
router.route("/allPosts").get(getAllPosts);
router.route("/delete/:id").delete(authenticateUser, deletePost);
router.route("/subgreddiiitPosts/:id").get(authenticateUser, getSubGreddiiitPosts);
router.route("/upvote/:id").patch(authenticateUser, upvotePost);
router.route("/downvote/:id").patch(authenticateUser, downvotePost);
router.route("/save/:id").patch(authenticateUser, savePost);
router.route("/saved").get(authenticateUser, getSavedPosts);
router.route("/userPosts/:id").get(authenticateUser, getUserPosts);

export default router;