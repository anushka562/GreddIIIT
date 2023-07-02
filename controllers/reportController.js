import { StatusCodes } from 'http-status-codes';
import Report from '../models/Report.js'
import Post from '../models/Post.js'

const createReport = async(req, res)=>{
    const {concern, reportedBy, reportedPost, reportedSubgreddiiit, reportedUser} = req.body;
    const report = await Report.create({concern, reportedBy, reportedPost, reportedSubgreddiiit, reportedUser});

    const reports = await Report.find({reportedSubgreddiiit: reportedSubgreddiiit});
    res.status(StatusCodes.CREATED).json({reports, msg: `The post has been reported`});
}

const getSubgreddiiitReports = async(req, res)=>{
    const {id} = req.params;
    let reports = await Report.find({reportedSubgreddiiit: id});
    // const reportedPost = reports.map((report)=>{
    //     return report.reportedPost.toString();
    // })
    // console.log(reportedPost)

    // const posts = await Post.find({_id: {$in: reportedPost}});
    // console.log(posts);
    // reports = reports.map((report)=>{
    //     const post = posts.filter((post)=> post._id.toString() === report.reportedPost.toString());
    //     return {...report, post}
    // })
        
    console.log(reports);
    res.status(StatusCodes.OK).json({reports});
}

const getSubgreddiiitReportedPosts = async(req, res)=>{
    const {id} = req.params;
    const subgreddiiitReports = await Report.find({reportedSubgreddiiit: id});
    const subgreddiiiitReportedPost = subgreddiiitReports.map((report)=>{
        return report.reportedPost;
    })

    res.status(StatusCodes.OK).json({msg: 'the report has been ignored',subgreddiiiitReportedPost});
}

const ignoreReport = async(req, res)=>{
    const {id} = req.params;
    const report = await Report.findById(id);
    const {reportedBy, reportedPost, reportedSubgreddiiit, reportedUser} = report;
    await Report.findByIdAndDelete(id);

    
    const reports = await Report.find({reportedSubgreddiiit: reportedSubgreddiiit});
    res.status(StatusCodes.OK).json({reports});
}

const deleteReport = async(req, res)=>{
    const {id} = req.params;
    const report = await Report.findById(id);
    const {reportedBy, reportedPost, reportedSubgreddiiit, reportedUser} = report;
    
    await Report.findByIdAndDelete(id);
    const postId = reportedPost;
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
    allReports.forEach(async (report)=>{
        if(report.reportedPost === postId){
            await Report.findByIdAndDelete(report._id);
        }
    })
    
    // check once
    const subgreddiiitId = post.postedIn;
    const subgreddiiit = await Subgreddiiits.findById(subgreddiiitId);
    const idx = subgreddiiit.posts.indexOf(postId);
    subgreddiiit.posts.splice(idx, 1);
    await subgreddiiit.save();
    await Post.findByIdAndDelete(postId)

    const reports = await Report.find({reportedSubgreddiiit: reportedSubgreddiiit});

    res.status(StatusCodes.OK).json({msg: 'The reported post has been deleted', reports});
}

const isPostReported = async(req, res)=>{
    const {id} = req.params;
    const reports = await Report.find();

    let isReported = false;
    reports.forEach((report)=>{
        console.log(report.reportedPost.toString(), id);
        if(report.reportedPost.toString() == id){
            isReported = true;
        }
    })

    console.log(isReported, id);

    res.status(StatusCodes.OK).json({isReported});
}

export {
    createReport,
    getSubgreddiiitReports,
    ignoreReport,
    deleteReport,
    isPostReported,
    getSubgreddiiitReportedPosts,
}