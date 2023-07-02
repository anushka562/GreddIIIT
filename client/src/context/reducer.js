import { 
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR, 
    LOGIN_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    SET_USER_FOLLOWERS_BEGIN,
    SET_USER_FOLLOWERS_ERROR,
    SET_USER_FOLLOWERS_SUCCESS,
    SET_USER_FOLLOWINGS_BEGIN,
    SET_USER_FOLLOWINGS_SUCCESS,
    SET_USER_FOLLOWINGS_ERROR, 
    SET_USER_NOT_FOLLOWINGS_BEGIN,
    SET_USER_NOT_FOLLOWINGS_SUCCESS,
    SET_USER_NOT_FOLLOWINGS_ERROR,
    UPDATE_USER_INFO_BEGIN,
    UPDATE_USER_INFO_ERROR,
    UPDATE_USER_INFO_SUCCESS,
    GET_MY_SUBGREDDIIIT_BEGIN,
    GET_MY_SUBGREDDIIIT_ERROR,
    GET_MY_SUBGREDDIIIT_SUCCESS, 
    CREATE_SUBGREDDIIIT_BEGIN,
    CREATE_SUBGREDDIIIT_SUCCESS,
    CREATE_SUBGREDDIIIT_ERROR,  
    DELETE_SUBGREDDIIIT_BEGIN,
    DELETE_SUBGREDDIIIT_ERROR,
    DELETE_SUBGREDDIIIT_SUCCESS,
    OPEN_SUBGREDDIIIT_BEGIN,
    OPEN_SUBGREDDIIIT_ERROR,
    OPEN_SUBGREDDIIIT_SUCCESS,
    GET_SUBGREDDIIIT_FOLLOWERS_BEGIN,
    GET_SUBGREDDIIIT_FOLLOWERS_ERROR,
    GET_SUBGREDDIIIT_FOLLOWERS_SUCCESS,
    GET_SUBGREDDIIIT_JOIN_REQUESTS_BEGIN,
    GET_SUBGREDDIIIT_JOIN_REQUESTS_ERROR,
    GET_SUBGREDDIIIT_JOIN_REQUESTS_SUCCESS,
    GET_SUBGREDDIIIT_MODERATORS_BEGIN,
    GET_SUBGREDDIIIT_MODERATORS_ERROR,
    GET_SUBGREDDIIIT_MODERATORS_SUCCESS,
    GET_SUBGREDDIIIT_POSTS_BEGIN,
    GET_SUBGREDDIIIT_POSTS_ERROR,
    GET_SUBGREDDIIIT_POSTS_SUCCESS,
    CREATE_POST_BEGIN,
    CREATE_POST_ERROR,
    CREATE_POST_SUCCESS,
    GET_USER_SUCCESS,
    GET_USER_BEGIN,
    GET_USER_ERROR,
    UPVOTE_POST_SUCCESS,
    DOWNVOTE_POST_SUCCESS,
    DELETE_POST_BEGIN,
    DELETE_POST_ERROR,
    DELETE_POST_SUCCESS,
    SAVE_POST_SUCCESS,
    GET_SAVED_POSTS_BEGIN,
    GET_SAVED_POSTS_SUCCESS,
    GET_SAVED_POSTS_ERROR,
    GET_FOLLOWING_SUBGREDDIIITS_BEGIN,
    GET_FOLLOWING_SUBGREDDIIITS_SUCCESS,
    GET_FOLLOWING_SUBGREDDIIITS_ERROR,
    GET_NON_FOLLOWING_SUBGREDDIIITS_BEGIN,
    GET_NON_FOLLOWING_SUBGREDDIIITS_ERROR,
    GET_NON_FOLLOWING_SUBGREDDIIITS_SUCCESS,
    SEND_JOIN_REQUEST_SUCCESS,
    SEND_JOIN_REQUEST_ERROR,
    ACCEPT_JOIN_REQUEST_ERROR,
    ACCEPT_JOIN_REQUEST_SUCCESS,
    REJECT_JOIN_REQUEST_ERROR,
    REJECT_JOIN_REQUEST_SUCCESS,
    LEAVE_SUBGREDDIIIT_BEGIN,
    LEAVE_SUBGREDDIIIT_ERROR,
    LEAVE_SUBGREDDIIIT_SUCCESS,
    HANDLE_CHANGE,
    CLEAR_FILTERS,
    REPORT_POST_ERROR,
    REPORT_POST_SUCCESS,
    GET_REPORTED_POST_ERROR,
    GET_REPORTED_POST_SUCCESS,
    GET_REPORTS_SUCCESS,
    GET_REPORTS_ERROR,
    IGNORE_REPORTED_POST_SUCCESS,
    IGNORE_REPORTED_POST_ERROR,
    BLOCK_USER_SUCCESS,
    BLOCK_USER_ERROR,
    GET_BLOCKED_FOLLOWERS_BEGIN,
    GET_BLOCKED_FOLLOWERS_ERROR,
    GET_BLOCKED_FOLLOWERS_SUCCESS,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action)=>{
    if(action.type === DISPLAY_ALERT){
        return{
            ...state, 
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!!',
        }
    }
    if(action.type === CLEAR_ALERT){
        return{
            ...state, 
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if(action.type === HANDLE_CHANGE){
        return{
            ...state, 
            [action.payload.name]:action.payload.value,
        }
    }       

    if(action.type === REGISTER_USER_BEGIN){
        return {
            ...state, 
            isLoading: true,
        }
    }
    if(action.type === REGISTER_USER_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true, 
            alertType: 'success',
            alertText: 'User Created! Redirecting...',
        }
    }
    if(action.type === REGISTER_USER_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true, 
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if(action.type === LOGIN_USER_BEGIN){
        return {
            ...state, 
            isLoading: true,
        }
    }
    if(action.type === LOGIN_USER_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true, 
            alertType: 'success',
            alertText: 'User Logged In! Redirecting...',
        }
    }
    if(action.type === LOGIN_USER_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true, 
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if(action.type === TOGGLE_SIDEBAR){
        return{
            ...state, 
            showSidebar: !state.showSidebar
        }
    }
    if(action.type === LOGOUT_USER){
        return {
            ...initialState,
            user: null,
            token: null, 
        }
    }
    if(action.type === UPDATE_USER_BEGIN){
        return {
            ...state,
            isLoading: true,
        }
    }
    if(action.type === UPDATE_USER_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertText: 'User Profile Updated',
            alertType: 'success',
        }
    }
    if(action.type === UPDATE_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === SET_USER_FOLLOWINGS_BEGIN){
        return {
            ...state,
            isLoading: true,
        }
    }
    if(action.type === SET_USER_FOLLOWINGS_SUCCESS){
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userFollowings: action.payload.followings,
        }
    }
    if(action.type === SET_USER_FOLLOWINGS_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: `Something went wrong. Refresh again.`
        }
    }
    if(action.type === SET_USER_FOLLOWERS_BEGIN){
        return {
            ...state,
            isLoading: true,
        }
    }
    if(action.type === SET_USER_FOLLOWERS_SUCCESS){
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userFollowers: action.payload.followers,
        }
    }
    if(action.type === SET_USER_FOLLOWERS_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: `Something went wrong. Refresh again.`
        }
    }
    if(action.type === SET_USER_NOT_FOLLOWINGS_BEGIN){
        return{
            ...state, 
            isLoading:true,
        }
    }
    if(action.type === SET_USER_NOT_FOLLOWINGS_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            userNotFollowings: action.payload.notFollowing,
        }
    }
    if(action.type === SET_USER_NOT_FOLLOWINGS_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertText: 'Something went wrong. Refresh again.',
            alertType: 'danger',
        }
    }
    if(action.type === UPDATE_USER_INFO_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === UPDATE_USER_INFO_SUCCESS){
        return{
            ...state,
            isLoading:false,
            user: action.payload.user,
        }
    }
    if(action.type === UPDATE_USER_INFO_ERROR){
        return{
            ...state, 
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger',
        }
    }
    if(action.type === GET_MY_SUBGREDDIIIT_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_MY_SUBGREDDIIIT_SUCCESS){
        return{
            ...state,
            isLoading: false,
            mySubGreddiiits: action.payload.data,
        }
    }
    if(action.type === GET_MY_SUBGREDDIIIT_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true, 
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === CREATE_SUBGREDDIIIT_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === CREATE_SUBGREDDIIIT_SUCCESS){
        return{
            ...state,
            isLoading: false,
            mySubGreddiiits: action.payload.data,
            showAlert: true,
            alertText: 'New SubGreddIIIT created successfully',
            alertType: 'success'
        }
    }
    if(action.type === CREATE_SUBGREDDIIIT_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true, 
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === DELETE_SUBGREDDIIIT_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === DELETE_SUBGREDDIIIT_SUCCESS){
        return{
            ...state,
            isLoading: false,
            mySubGreddiiits: action.payload.data,
            showAlert: true,
            alertText: 'SubGreddIIIT deleted sucessfully',
            alertType: 'success',
        }
    }
    if(action.type === DELETE_SUBGREDDIIIT_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: 'Something went wrong, Please try again later.',
            alertType: 'danger',
        }
    }
    if(action.type === OPEN_SUBGREDDIIIT_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === OPEN_SUBGREDDIIIT_SUCCESS){
        return{
            ...state,
            isLoading: false,
            currentSubgreddiiit: action.payload.data,
        }
    }
    if(action.type === OPEN_SUBGREDDIIIT_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === GET_SUBGREDDIIIT_FOLLOWERS_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_FOLLOWERS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            subgreddiiitFollowers: action.payload.data,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_FOLLOWERS_ERROR){
        return{
            ...state,
            isLoading: false,
            currentSubgreddiiit: null,
        }
    }
    if(action.type === GET_BLOCKED_FOLLOWERS_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_BLOCKED_FOLLOWERS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            subgreddiiitBlockedFollowers: action.payload.blockedFollowers,
        }
    }
    if(action.type === GET_BLOCKED_FOLLOWERS_ERROR){
        return{
            ...state,
            isLoading: false,
            currentSubgreddiiit: null,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_MODERATORS_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_MODERATORS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            subgreddiiitModerators: action.payload.data,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_MODERATORS_ERROR){
        return{
            ...state,
            isLoading: false,
            currentSubgreddiiit: null,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_JOIN_REQUESTS_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_JOIN_REQUESTS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            subgreddiiitJoinRequests: action.payload.data,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_JOIN_REQUESTS_ERROR){
        return{
            ...state,
            isLoading: false,
            currentSubgreddiiit: null,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_POSTS_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_POSTS_SUCCESS){
        return{
            ...state,
            isLoadingPost: false,
            subgreddiiitPosts: action.payload.data,
        }
    }
    if(action.type === GET_SUBGREDDIIIT_POSTS_ERROR){
        return{
            ...state,
            isLoadingPost: false,
            currentSubgreddiiit: null,
        }
    }
    if(action.type === CREATE_POST_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === CREATE_POST_SUCCESS){
        return{
            ...state,
            isLoading: false,
            subgreddiiitPosts: action.payload.data,
            showAlert: true,
            alertText: 'Post added to the subgreddiiit',
            alertType: 'success'
        }
    }
    if(action.type === CREATE_POST_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true, 
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === GET_USER_BEGIN){
        return {
            ...state,
            // isLoadingPost: true,
        }
    }
    if(action.type === GET_USER_SUCCESS){
        return{
            ...state,
            // isLoadingPost: false, 
            postPostedBy: action.payload.data,
            // postPostedById: action.payload.data._id,
        }
    }
    if(action.type === GET_USER_ERROR){
        return{
            ...state,
            // isLoadingPost: false,
        }
    }

    if(action.type === UPVOTE_POST_SUCCESS){
        return {
            ...state,
            subgreddiiitPosts: action.payload.data,
            savedPosts: action.payload.savedPosts,
            // user: action.payload.user,
        }
    }
    if(action.type === DOWNVOTE_POST_SUCCESS){
        return {
            ...state,
            subgreddiiitPosts: action.payload.data,
            savedPosts: action.payload.savedPosts,
            // user: action.payload.user,
        }
    }
    if(action.type === DELETE_POST_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === DELETE_POST_SUCCESS){
        return{
            ...state,
            isLoading: false,
            subgreddiiitPosts: action.payload.data,
            reports: action.payload.reports,
            showAlert: true,
            alertText: 'Post deleted from the subgreddiiit',
            alertType: 'success'
        }
    }
    if(action.type === DELETE_POST_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true, 
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === SAVE_POST_SUCCESS){
        return{
            ...state,
            // user: action.payload.user,
            subgreddiiitPosts: action.payload.data,
            savedPosts: action.payload.savedPosts,
        }
    }
    if(action.type === GET_SAVED_POSTS_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_SAVED_POSTS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            savedPosts: action.payload.data,
        }
    }
    if(action.type === GET_SAVED_POSTS_ERROR){
        return{
            ...state,
            isLoading: false,
            alertText: action.payload.msg,
            alertType: 'danger',
            showAlert: true,
        }
    }
    if(action.type === GET_FOLLOWING_SUBGREDDIIITS_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_FOLLOWING_SUBGREDDIIITS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            followingSubgreddiiits: action.payload.data,
        }
    }
    if(action.type === GET_FOLLOWING_SUBGREDDIIITS_ERROR){
        return{
            ...state,
            isLoading: false,
            alertText: action.payload.msg,
            showAlert: true,
            alertType: 'danger'
        }
    }
    if(action.type === GET_NON_FOLLOWING_SUBGREDDIIITS_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === GET_NON_FOLLOWING_SUBGREDDIIITS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            nonFollowingSubgreddiiits: action.payload.data,
        }
    }
    if(action.type === GET_NON_FOLLOWING_SUBGREDDIIITS_ERROR){
        return{
            ...state,
            isLoading: false,
            alertText: action.payload.msg,
            showAlert: true,
            alertType: 'danger'
        }
    }
    if(action.type === SEND_JOIN_REQUEST_SUCCESS){
        return{
            ...state, 
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'success'
        }
    }
    if(action.type === SEND_JOIN_REQUEST_ERROR){
        return{
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === ACCEPT_JOIN_REQUEST_SUCCESS){
        return{
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'success',
            subgreddiiitJoinRequests: action.payload.joinRequests,
            subgreddiiitFollowers: action.payload.followers,
        }
    }
    if(action.type === ACCEPT_JOIN_REQUEST_ERROR){
        return{
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger',
        }
    }
    if(action.type === REJECT_JOIN_REQUEST_SUCCESS){
        return{
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'success',
            subgreddiiitJoinRequests: action.payload.joinRequests,
            subgreddiiitFollowers: action.payload.followers,
        }
    }
    if(action.type === REJECT_JOIN_REQUEST_ERROR){
        return{
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger',
        }
    }
    if(action.type === LEAVE_SUBGREDDIIIT_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === LEAVE_SUBGREDDIIIT_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'success',
            followingSubgreddiiits: action.payload.followingSubgreddiiits,
            nonFollowingSubgreddiiits: action.payload.nonFollowingSubgreddiiits,
        }
    }
    if(action.type === LEAVE_SUBGREDDIIIT_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger',
        }
    }
    if(action.type === CLEAR_FILTERS){
        return {
            ...state, 
            search: '',
            sort: 'latest',
            tags: '',
        }
    }
    if(action.type === REPORT_POST_ERROR){
        return{
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        }
    }
    if(action.type === REPORT_POST_SUCCESS){
        return{
            ...state,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'success',
            reports: action.payload.reports,
        }
    }
    if(action.type === GET_REPORTED_POST_SUCCESS){
        return {
            ...state, 
            reportedPosts: action.payload.data,
        }
    }
    if(action.type === GET_REPORTED_POST_ERROR){
        return{
            ...state, 
            currentSubgreddiiit: null,
        }
    }
    if(action.type === GET_REPORTS_SUCCESS){
        return{
            ...state,
            reports: action.payload.reports,
        }
    }
    if(action.type === GET_REPORTS_ERROR){
        return{
            ...state,
            currentSubgreddiiit: null,
        }
    }
    if(action.type === IGNORE_REPORTED_POST_SUCCESS){
        return{
            ...state, 
            reports: action.payload.reports,
            alertText: action.payload.msg,
            alertType: 'success',
            showAlert: true,
        }
    }
    if(action.type === IGNORE_REPORTED_POST_ERROR){
        return{
            ...state,
            alertText: action.payload.msg,
            alertType: 'danger',
            showAlert: true,
        }
    }
    if(action.type === BLOCK_USER_SUCCESS){
        return{
            ...state, 
            subgreddiiitFollowers: action.payload.followers,
            subgreddiiitBlockedFollowers: action.payload.blockedFollowers,
            subgreddiiitPosts: action.payload.posts,
            reports: action.payload.reports,
            showAlert: true,
            alertText: 'the user has been blocked',
            alertType: 'success',
        }
    }
    if(action.type === BLOCK_USER_ERROR){
        return{
            ...state,
            showAlert: false,
            alertText: action.payload.msg,
            alertType: 'danger',
        }
    }

    throw new Error(`no such action: ${action.type}`)
}

export default reducer;