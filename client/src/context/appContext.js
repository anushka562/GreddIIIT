import React, {useReducer, useContext } from "react";
import reducer from "./reducer";
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
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_ERROR,
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
    GET_USER_BEGIN,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    UPVOTE_POST_SUCCESS,
    DOWNVOTE_POST_SUCCESS,
    DELETE_POST_BEGIN,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    SAVE_POST_SUCCESS,
    GET_SAVED_POSTS_BEGIN,
    GET_SAVED_POSTS_ERROR,
    GET_SAVED_POSTS_SUCCESS,
    GET_FOLLOWING_SUBGREDDIIITS_BEGIN,
    GET_FOLLOWING_SUBGREDDIIITS_ERROR,
    GET_FOLLOWING_SUBGREDDIIITS_SUCCESS,
    GET_NON_FOLLOWING_SUBGREDDIIITS_BEGIN,
    GET_NON_FOLLOWING_SUBGREDDIIITS_ERROR,
    GET_NON_FOLLOWING_SUBGREDDIIITS_SUCCESS,
    SEND_JOIN_REQUEST_ERROR,
    SEND_JOIN_REQUEST_SUCCESS,
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
    GET_REPORTS_ERROR,
    GET_REPORTS_SUCCESS,
    IGNORE_REPORTED_POST_ERROR,
    IGNORE_REPORTED_POST_SUCCESS,
    BLOCK_USER_ERROR, 
    BLOCK_USER_SUCCESS,
    GET_BLOCKED_FOLLOWERS_BEGIN,
    GET_BLOCKED_FOLLOWERS_ERROR,
    GET_BLOCKED_FOLLOWERS_SUCCESS,
} from "./actions";
import axios from 'axios'

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: '',
    user: user? JSON.parse(user): null,
    token: token,
    showSidebar: false,
    userFollowers: [],
    userFollowings: [],
    userNotFollowings: [],
    mySubGreddiiits: [],
    currentSubgreddiiit: null,
    subgreddiiitFollowers: [],
    subgreddiiitBlockedFollowers: [],
    subgreddiiitPosts: [],
    subgreddiiitModerators: [],
    subgreddiiitJoinRequests: [],
    postPostedBy: '',
    isPostLoading: false,
    savedPosts: [],
    followingSubgreddiiits: [],
    nonFollowingSubgreddiiits: [],
    search: '',
    tags: '',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a', 'most followed', 'least followed'],
    reportedPosts: [],
    reports: [],
}


const AppContext = React.createContext()
const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    //axios
    const authFetch = axios.create({
        baseURL: '/api/v1',
    })

    //request
    authFetch.interceptors.request.use((config)=>{
        config.headers['Authorization'] = `Bearer ${state.token}`
        return config
    }, (error)=>{
        return Promise.reject(error)
    })

    //response
    authFetch.interceptors.response.use(
        (response)=>{
            return response
        }, (error)=>{
        //console.log(error.response);
        if(error.response.status === 401){
            logoutUser()
            // console.log('AUTH ERROR')
        }
        return Promise.reject(error)
        }
    )

    const displayAlert = ()=>{
        dispatch({type:DISPLAY_ALERT});
        clearAlert();
    }
    const clearAlert = ()=>{
        setTimeout(()=>{
            dispatch({type:CLEAR_ALERT});
        }, 3000);
    }

    const handleChange = ({name, value}) =>{
        dispatch({type: HANDLE_CHANGE, payload: {name, value}})
    }

    const registerUser = async (currentUser)=>{
        // console.log(currentUser);
        dispatch({type: REGISTER_USER_BEGIN});
        try {
            const response = await axios.post('api/v1/auth/register', currentUser)
            // console.log(response);
            const {user, token} = response.data
            dispatch({type: REGISTER_USER_SUCCESS, payload: {user, token}})
            //local storage
            addUserToLocalStorage({user, token});
        } catch(error) {
            // console.log(error.response);
            dispatch({type: REGISTER_USER_ERROR, payload: {msg: error.response.data.msg}})
        }
        clearAlert()
    }

    const loginUser = async (currentUser)=>{
        // console.log(currentUser);
        dispatch({type: LOGIN_USER_BEGIN});
        try {
            const {data} = await axios.post('api/v1/auth/login', currentUser);
            const {user, token} = data;
            dispatch({type:LOGIN_USER_SUCCESS, payload: {user, token}})
            addUserToLocalStorage({user, token})
        } catch (error) {
            dispatch({type: LOGIN_USER_ERROR, payload:{msg: error.response.data.msg}});
        }
        clearAlert();
    }

    const addUserToLocalStorage = ({user, token})=>{
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }
    const removeUserToLocalStorage = ()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const toggleSidebar = ()=>{
        dispatch({type: TOGGLE_SIDEBAR});
    }

    const logoutUser = ()=>{
        dispatch({type: LOGOUT_USER});
        removeUserToLocalStorage();
    }

    const updateUser = async (currentUser)=>{
        dispatch({type: UPDATE_USER_BEGIN});
        try {
            const response = await authFetch.patch('/user/updateUser', currentUser)
            // console.log(response);
            const {user, token} = response.data;

            dispatch({type: UPDATE_USER_SUCCESS, payload:{user, token}})

            addUserToLocalStorage({user, token});
        } catch (error) {
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert();
    }

    const getNotFollowing = async ()=>{
        dispatch({type: SET_USER_NOT_FOLLOWINGS_BEGIN})
        try{
            const {data} = await authFetch.get('user/allUsers');
            const {data:userData} = await authFetch.get(`user/singleUser/${state.user._id}`)
            const {user} = userData;
            const {users} = data;
            // console.log(users);
            const following = user.following;
            let notFollowing = users.filter((user)=>{
                const {_id} = user;
                return ((!following || !following.includes(_id)) && _id!==state.user._id)
                // {
                    // return {_id, firstName, lastName, username}
                // }  
            })
            dispatch({type: SET_USER_NOT_FOLLOWINGS_SUCCESS, payload:{notFollowing}});
            // console.log(notFollowing);
        } catch(error){
            // console.log(error);
            dispatch({type: SET_USER_NOT_FOLLOWINGS_ERROR})
            clearAlert();
            logoutUser()
        }
    }

    const getFollowers = async ()=>{ 
        dispatch({type: SET_USER_FOLLOWERS_BEGIN})
        try {
            const {data} = await authFetch.get(`/user/followers`);
            // console.log(data);
            const {followers, user} = data;
            dispatch({type:SET_USER_FOLLOWERS_SUCCESS, payload:{followers, user}});
        } catch (error) {
            dispatch({type: SET_USER_FOLLOWERS_ERROR, payload:{msg: error.response.data.msg}});
            clearAlert();
            logoutUser()
        }
    }

    const getFollowing = async ()=>{
        dispatch({type: SET_USER_FOLLOWINGS_BEGIN})
        try {
            const {data} = await authFetch.get(`/user/following`);
            // console.log(data);
            const {followings, user} = data;
            dispatch({type:SET_USER_FOLLOWINGS_SUCCESS, payload:{followings, user}});
        } catch (error) {
            dispatch({type: SET_USER_FOLLOWINGS_ERROR, payload:{msg: error.response.data.msg}});
            clearAlert();
            logoutUser()
        }
    }

    const addFollower = async (id)=>{
        dispatch({type: UPDATE_USER_INFO_BEGIN});
        try{
            const {data} = await authFetch.patch(`/user/addFollower?followerId=${id}`);
            const {user} = data;
            dispatch({type: UPDATE_USER_INFO_SUCCESS, payload:{user}})
        } catch(error){
            dispatch({type: UPDATE_USER_INFO_ERROR, payload:{msg: error.response.data.msg}})
            clearAlert()
            // logoutUser()
        }
        getFollowing();
        getFollowers();
        getNotFollowing();
    }

    const removeFollower = async(id)=>{
        dispatch({type: UPDATE_USER_INFO_BEGIN});
        try{
            const {data} = await authFetch.patch(`/user/removeFollower?followerId=${id}`);
            const {user} = data;
            dispatch({type: UPDATE_USER_INFO_SUCCESS, payload:{user}})
        } catch(error){
            dispatch({type: UPDATE_USER_INFO_ERROR, payload:{msg: error.response.data.msg}})
            clearAlert()
            // logoutUser()
        }
        getFollowers();
        getFollowing();
        getNotFollowing();
    }

    const unfollowFollowing = async(id)=>{
        dispatch({type: UPDATE_USER_INFO_BEGIN});
        // console.log('before', state.user);
        try{
            const {data} = await authFetch.patch(`/user/unfollowFollowing?followingId=${id}`);
            const {user} = data;
            // console.log('output', user);
            dispatch({type: UPDATE_USER_INFO_SUCCESS, payload:{user}})
        } catch(error){
            dispatch({type: UPDATE_USER_INFO_ERROR, payload:{msg: error.response.data.msg}})
            clearAlert()
            // logoutUser()
    
        }
        // console.log('after', state.user)
        getFollowers();
        getFollowing();
        getNotFollowing();
    }

    const createSubgreddiiit =async ({name, description, tags, bannedKeywords, imgPath})=>{
        dispatch({type: CREATE_SUBGREDDIIIT_BEGIN});
        try{
            const {data} = await authFetch.post(`/subgreddiiit/create`, {name, description, tags, bannedKeywords, imgPath})
            const {mySubgreddiiits} = data;
            // console.log(mySubgreddiiits);
            dispatch({type: CREATE_SUBGREDDIIIT_SUCCESS, payload:{data: mySubgreddiiits}})
        }catch(error){
            dispatch({type: CREATE_SUBGREDDIIIT_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    }

    const getMySubgreddiiits = async ()=>{
        dispatch({type: GET_MY_SUBGREDDIIIT_BEGIN});
        try{
            const {data} = await authFetch.get('/subgreddiiit/mySubgreddiiits');
            // // console.log(response)
            const {mySubgreddiiits} = data;
            dispatch({type: GET_MY_SUBGREDDIIIT_SUCCESS, payload:{data: mySubgreddiiits}})
        } catch(error){
            dispatch({type: GET_MY_SUBGREDDIIIT_ERROR, payload:{msg: error.response.data.msg}});
            clearAlert();
            logoutUser()
        }
    }

    const deleteSubgreddiiit = async (id)=>{
        dispatch({type: DELETE_SUBGREDDIIIT_BEGIN});
        try {
            const {data} = await authFetch.delete(`/subgreddiiit/delete/${id}`);
            const {mySubgreddiiits} = data;
            // // console.log(mySubgreddiiits);
            dispatch({type: DELETE_SUBGREDDIIIT_SUCCESS, payload:{data: mySubgreddiiits}});
        } catch (error) {
            dispatch({type: DELETE_SUBGREDDIIIT_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert();
    }

    const openSubgreddiiit = async(id)=>{
        dispatch({type: OPEN_SUBGREDDIIIT_BEGIN});
        try {
            const {data} = await authFetch.get(`/subgreddiiit/singleSubgreddiiit/${id}`);
            const {subgreddiiit} = data;
            dispatch({type: OPEN_SUBGREDDIIIT_SUCCESS, payload: {data: subgreddiiit}});
        } catch (error) {
            dispatch({type: OPEN_SUBGREDDIIIT_ERROR, payload: {msg: error.response.data.msg}});
            clearAlert();
        }
    }

    const getSubgreddiiitFollowers = async()=>{
        const id = state.currentSubgreddiiit._id;
        dispatch({type: GET_SUBGREDDIIIT_FOLLOWERS_BEGIN});
        try {
            const {data} = await authFetch.get(`/subgreddiiit/followers/${id}`);
            // // console.log(data);
            const {followers} = data;
            dispatch({type: GET_SUBGREDDIIIT_FOLLOWERS_SUCCESS, payload: {data:followers}})
        } catch (error) {
            dispatch({type: GET_SUBGREDDIIIT_FOLLOWERS_ERROR, payload:{msg: error.response.data.msg}});
            logoutUser()
        }
    }

    const getSubgreddiiitBlockedFollowers = async()=>{
        const id = state.currentSubgreddiiit._id;
        dispatch({type: GET_BLOCKED_FOLLOWERS_BEGIN});
        try{
            const {data} = await authFetch(`subgreddiiit/blocked/${id}`);
            const {blockedFollowers} = data;
            dispatch({type: GET_BLOCKED_FOLLOWERS_SUCCESS, payload: {blockedFollowers}});
        }catch(error){
            dispatch({type: GET_BLOCKED_FOLLOWERS_ERROR, payload: {msg: error.response.data.msg}});
            logoutUser()
        }
    }

    const getSubgreddiiitModerators = async()=>{
        const id = state.currentSubgreddiiit._id;
        dispatch({type: GET_SUBGREDDIIIT_MODERATORS_BEGIN});
        try {
            const {data} = await authFetch.get(`/subgreddiiit/moderators/${id}`);
            // // console.log(data);
            const {moderators} = data;
            dispatch({type: GET_SUBGREDDIIIT_MODERATORS_SUCCESS, payload: {data:moderators}})
        } catch (error) {
            dispatch({type: GET_SUBGREDDIIIT_MODERATORS_ERROR, payload:{msg: error.response.data.msg}});
            logoutUser()
        }
    }

    const getSubgreddiiitPosts = async()=>{
        const id = state.currentSubgreddiiit._id;
        dispatch({type: GET_SUBGREDDIIIT_POSTS_BEGIN});
        try {
            const {data} = await authFetch.get(`/subgreddiiit/posts/${id}`);
            const {posts} = data;
            dispatch({type: GET_SUBGREDDIIIT_POSTS_SUCCESS, payload:{data: posts}});
        } catch (error) {
            dispatch({type: GET_SUBGREDDIIIT_POSTS_ERROR, payload: {msg: error.response.data.msg}});
            logoutUser()
        }
    }

    const getSubgreddiiitJoinRequests = async()=>{
        const id = state.currentSubgreddiiit._id;
        dispatch({type: GET_SUBGREDDIIIT_JOIN_REQUESTS_BEGIN});
        try {
            const {data} = await authFetch.get(`/subgreddiiit/joinRequests/${id}`);
            // // console.log(data);
            const {joinRequests} = data;
            dispatch({type: GET_SUBGREDDIIIT_JOIN_REQUESTS_SUCCESS, payload:{data:joinRequests}})
        } catch (error) {
            dispatch({type: GET_SUBGREDDIIIT_JOIN_REQUESTS_ERROR, payload:{msg: error.response.data.msg}});
            logoutUser()
        }
    }

    const createPost = async ({id, title, description, imgPath})=>{
        dispatch({type: CREATE_POST_BEGIN});
        try {
            const {data} = await authFetch.post(`post/create`, {subgreddiiitId: id, title, description, imgPath});
            const {posts} = data;
            dispatch({type: CREATE_POST_SUCCESS, payload: {data: posts}});
        } catch (error) {
            dispatch({type: CREATE_POST_ERROR, payload:{msg: error.response.data.msg}});
        }
        clearAlert();
    }

    const getUser = async (id)=>{
        dispatch({type: GET_USER_BEGIN})
        try {
            const {data} = await authFetch.get(`user/singleUser/${id}`)
            const {user} = data;
            dispatch({type: GET_USER_SUCCESS, payload:{data: user}});
        } catch(error){
            dispatch({type: GET_USER_ERROR});
            // // console.log(error);
            logoutUser()
        }
    }

    const upvotePost = async(id)=>{
        try{
            const {data} = await authFetch.patch(`post/upvote/${id}`)
            const {posts, user, savedPosts} = data;
            dispatch({type: UPVOTE_POST_SUCCESS, payload: {data: posts, user, savedPosts}});
        }catch(error){
            // // console.log(error);
            // logoutUser()
        }
    }

    const downvotePost = async(id)=>{
        try{
            const {data} = await authFetch.patch(`post/downvote/${id}`)
            const {posts, user, savedPosts} = data;
            dispatch({type: DOWNVOTE_POST_SUCCESS, payload: {data: posts, user, savedPosts}});
        }catch(error){
            // // console.log(error);
        }
    }

    const deletePost = async(id)=>{
        dispatch({type: DELETE_POST_BEGIN});
        try{
            const {data} = await authFetch.delete(`post/delete/${id}`);
            const {posts, reports} = data;
            dispatch({type: DELETE_POST_SUCCESS, payload:{data: posts, reports}});
        }catch(error){
            dispatch({type: DELETE_POST_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    }

    const savePost = async(id)=>{
        try{
            const {data} = await authFetch.patch(`post/save/${id}`)
            const {posts, savedPosts} = data;
            dispatch({type: SAVE_POST_SUCCESS, payload:{data: posts, savedPosts}});
        }catch(error){
            // console.log(error);
        }
    }

    const getSavedPosts = async()=>{
        dispatch({type: GET_SAVED_POSTS_BEGIN});
        try {
            const {data} = await authFetch.get(`/post/saved`);
            const {posts} = data;
            dispatch({type: GET_SAVED_POSTS_SUCCESS, payload:{data: posts}});
        } catch (error) {
            dispatch({type: GET_SAVED_POSTS_ERROR, payload:{msg: error.response.data.msg}});
            clearAlert();
            logoutUser()
        }
    }

    const getFollowingSubgreddiiits = async()=>{
        const {search, tags, sort} = state;
        let url = `/subgreddiiit/followingSubgreddiiits?sort=${sort}`;
        if(search){
            url = url + `&search=${search}`
        }
        if(tags){
            url = url + `&tags=${tags}`
        }

        dispatch({type : GET_FOLLOWING_SUBGREDDIIITS_BEGIN})
        try {
            const {data} = await authFetch.get(url);
            const {subgreddiiits} = data;
            dispatch({type: GET_FOLLOWING_SUBGREDDIIITS_SUCCESS, payload:{data: subgreddiiits}});
        } catch (error) {
            dispatch({type: GET_FOLLOWING_SUBGREDDIIITS_ERROR, payload: {msg: error.response.data.msg}})
            clearAlert();
            logoutUser()
        }
    }

    const getNonFollowingSubgreddiiits = async()=>{
        const {search, tags, sort} = state;
        let url = `/subgreddiiit/nonFollowingSubgreddiiits?sort=${sort}`;
        if(search){
            url = url + `&search=${search}`
        }
        if(tags){
            url = url + `&tags=${tags}`
        }
        dispatch({type : GET_NON_FOLLOWING_SUBGREDDIIITS_BEGIN})
        try {
            const {data} = await authFetch.get(url);
            const {subgreddiiits} = data;
            dispatch({type: GET_NON_FOLLOWING_SUBGREDDIIITS_SUCCESS, payload:{data: subgreddiiits}});
        } catch (error) {
            dispatch({type: GET_NON_FOLLOWING_SUBGREDDIIITS_ERROR, payload: {msg: error.response.data.msg}})
            clearAlert();
            logoutUser();
        }
    }

    const sendJoinRequest = async(id)=>{
        try{
            const {data} = await authFetch.patch(`/subgreddiiit/join/${id}`);
            const {msg} = data;
            dispatch({type: SEND_JOIN_REQUEST_SUCCESS, payload: {msg}});
        } catch(error){
            dispatch({type: SEND_JOIN_REQUEST_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    }
    
    const acceptJoinRequest = async(id, userId)=>{
        try{
            const {data} = await authFetch.patch(`/subgreddiiit/accept/${userId}/${id}`)
            const {msg, joinRequests, followers} = data;
            dispatch({type: ACCEPT_JOIN_REQUEST_SUCCESS, payload:{msg, joinRequests, followers}})
        } catch(error){
            dispatch({type: ACCEPT_JOIN_REQUEST_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert();
    }

    const rejectJoinRequest = async(id, userId)=>{
        try{
            const {data} = await authFetch.patch(`/subgreddiiit/accept/${userId}/${id}`)
            const {msg, joinRequests, followers} = data;
            dispatch({type: REJECT_JOIN_REQUEST_SUCCESS, payload:{msg, joinRequests, followers}})
        } catch(error){
            dispatch({type: REJECT_JOIN_REQUEST_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert();
    }

    const leaveSubgreddiiit = async(id)=>{
        dispatch({type: LEAVE_SUBGREDDIIIT_BEGIN})
        try {
            const {data} = await authFetch.patch(`/subgreddiiit/leave/${id}`);
            const {msg, followingSubgreddiiits, nonFollowingSubgreddiiits} = data;
            dispatch({type: LEAVE_SUBGREDDIIIT_SUCCESS, payload: {msg, followingSubgreddiiits, nonFollowingSubgreddiiits}});
        } catch (error) {
            dispatch({type: LEAVE_SUBGREDDIIIT_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    }

    const clearFilters = ()=>{
        dispatch({type:CLEAR_FILTERS});
    }

    const reportPost = async (report)=>{
        // console.log(report);
        try {
            const {data} = await authFetch.post('/report/create', report);
            const {msg, reports} = data;
            dispatch({type: REPORT_POST_SUCCESS, payload: {msg, reports}});
        } catch (error) {
            dispatch({type: REPORT_POST_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    }
    const getReportedPosts = async(id)=>{
        try {
            const {data} = await authFetch.get(`/report/reportedPosts/${id}`)
            const {subgreddiiiitReportedPost} = data;
            dispatch({type: GET_REPORTED_POST_SUCCESS, payload: {data: subgreddiiiitReportedPost}});
        } catch (error) {
            dispatch({type: GET_REPORTED_POST_ERROR});
            // console.log(error);
            // logoutUser()
        }
    }

    const getReports = async(id)=>{
        try {
            const {data} = await authFetch(`/report/reports/${id}`)
            const {reports} = data;
            dispatch({type: GET_REPORTS_SUCCESS, payload:{reports}});
        } catch (error) {
            dispatch({type: GET_REPORTS_ERROR});
            // console.log(error);
            // logoutUser()
        }
    }

    const ignoreReportedPost = async(id)=>{
        try {
            const {data} = await authFetch.patch(`/report/ignore/${id}`)
            const {reports, msg} = data;
            dispatch({type: IGNORE_REPORTED_POST_SUCCESS, payload: {msg, reports}})
        } catch (error) {
            dispatch({type: IGNORE_REPORTED_POST_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    }

    const blockUser = async(userId, subgreddiiitId)=>{
        try {
            const {data} = await authFetch.patch(`/subgreddiiit/block/${userId}/${subgreddiiitId}`);
            const {followers, blockedFollowers, posts, reports} = data;
            dispatch({type: BLOCK_USER_SUCCESS, payload: {followers, blockedFollowers, reports, posts}});
        } catch (error) {
            dispatch({type: BLOCK_USER_ERROR, payload: {msg: error.response.data.msg}})
        }
        clearAlert();
    }

    return <AppContext.Provider value={{
            ...state,
            displayAlert,
            clearAlert,
            handleChange,
            clearFilters,
            registerUser,
            loginUser,
            toggleSidebar,
            logoutUser,
            updateUser,
            getFollowers,
            getFollowing,
            getNotFollowing,
            addFollower,
            removeFollower,
            unfollowFollowing,
            createSubgreddiiit,
            getMySubgreddiiits,
            deleteSubgreddiiit,
            openSubgreddiiit,
            getSubgreddiiitFollowers,
            getSubgreddiiitJoinRequests,
            getSubgreddiiitModerators,
            getSubgreddiiitPosts,
            createPost,
            getUser,
            upvotePost,
            downvotePost,
            deletePost,
            savePost,
            getSavedPosts,
            getFollowingSubgreddiiits,
            getNonFollowingSubgreddiiits,
            sendJoinRequest,
            acceptJoinRequest,
            rejectJoinRequest,
            leaveSubgreddiiit,
            reportPost,
            getReportedPosts,
            getReports,
            ignoreReportedPost,
            blockUser,
            getSubgreddiiitBlockedFollowers,
        }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = ()=>{
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext};