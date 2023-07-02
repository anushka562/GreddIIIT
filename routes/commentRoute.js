import express from 'express'
const router = express.Router();
import authenticateUser from '../middleware/auth.js'

import {addComment, likeComment, getPostComments, deleteComment} from '../controllers/commentController.js'

router.route("/add").post( addComment);
router.route("/delete/:id").delete( deleteComment);
router.route("/like/:id/:userId").patch( likeComment);
router.route("/postComments/:postId").get(getPostComments);

export default router