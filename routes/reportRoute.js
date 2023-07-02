import express from 'express'
const router = express.Router();
import authenticateUser from '../middleware/auth.js'

import {
    createReport,
    getSubgreddiiitReports,
    ignoreReport,
    deleteReport,
    isPostReported,
    getSubgreddiiitReportedPosts,
} from '../controllers/reportController.js'

router.route('/create').post(authenticateUser, createReport);
router.route('/reports/:id').get(authenticateUser, getSubgreddiiitReports);
router.route('/ignore/:id').patch(authenticateUser, ignoreReport);
router.route('/delete/:id').delete(authenticateUser, deleteReport);
router.route('/isReported/:id').get(isPostReported);
router.route('/reportedPosts/:id').get(authenticateUser, getSubgreddiiitReportedPosts);

export default router