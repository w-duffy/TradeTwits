import {setUser} from './session'
const SET_DISCUSSION = "portfolio/SET_DISCUSSION"
const ADD_DISCUSSION_COMMENT = "portfolio/ADD_DISCUSSION_COMMENT"
const REMOVE_DISCUSSION_COMMENT = "portfolio/REMOVE_DISCUSSION_COMMENT"
const EDIT_DISCUSSION_COMMENT = "portfolio/EDIT_DISCUSSION_COMMENT"
const ADD_DISCUSSION_COMMENT_LIKE = "portfolio/ADD_DISCUSSION_COMMENT_LIKE"



const setDiscussion = (discussion) =>{
    return {
        type: SET_DISCUSSION,
        discussion
    }
}

export const getDiscussionDetails = (ticker) => async (dispatch) => {
    const res = await fetch(`/api/discussion/${ticker}`)
    if(res.ok) {
        const discussion = await res.json();
        dispatch(setDiscussion(discussion))
        return discussion
    }
}

const addComment = (comment) =>{
    return {
        type: ADD_DISCUSSION_COMMENT,
        comment
    }
}

export const addNewComment = (comment, user_id, stock_discussion_id) => async (dispatch) =>{
    const res = await fetch(`/api/discussion/new/comment`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            comment,
            user_id,
            stock_discussion_id
        })
    })
    if (res.ok){
        const result = await res.json();
        dispatch(addComment(result))
        return result
    }
  }

  const delComment = (comment) => {
    return {
        type: REMOVE_DISCUSSION_COMMENT,
        comment
    }
}

export const delDiscussionComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/discussion/delete/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    if(res.ok){
        const details = await res.json();
        dispatch(delComment(details))
    }
}

const editComment = (comment) => {
    return {
        type: EDIT_DISCUSSION_COMMENT,
        comment
    }
}

export const editDiscussionComment = (id, newComment) => async (dispatch) =>{
    const res = await fetch(`/api/discussion/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            newComment,
            id
        })
    })
    if (res.ok){
        const editedComment = await res.json();
        dispatch(editComment(editedComment))
        return editedComment
    }
}

// const addLike = (comment) => {
//     return {
//         type: ADD_DISCUSSION_COMMENT_LIKE,
//         comment
//     }
// }

export const addCommentLike = (id, user_id) => async (dispatch) =>{
    const res = await fetch(`/api/discussion/new/like/${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id,
            id
        })
    })
    if (res.ok){
        const likedComment = await res.json();
        dispatch(editComment(likedComment))
        return likedComment
    }
}

export const deleteCommentLike = (likeId, user_id, commentId) => async (dispatch) =>{
    const res = await fetch(`/api/discussion/delete/like/${likeId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id,
            likeId,
            commentId
        })
    })
    if (res.ok){
        const likedComment = await res.json();
        dispatch(editComment(likedComment))
        return likedComment
    }
}

export const addNewFollower = (userToFollowId, user_id) => async (dispatch) =>{
    console.log("store1", user_id, userToFollowId)
    const res = await fetch(`/api/follower/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id,
            userToFollowId
        })
    })
    if (res.ok){
        const updatedUser = await res.json();
        console.log("store2", updatedUser)
        dispatch(setUser(updatedUser))
        return updatedUser
    }
}

export const deleteNewFollower = (followId, user_id, userToFollowId) => async (dispatch) =>{
    console.log("store1", followId, user_id, userToFollowId)
    const res = await fetch(`/api/follower/delete/${followId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id,
            followId,
            userToFollowId
        })
    })
    if (res.ok){
        const updatedUser = await res.json();
        console.log("store2", updatedUser)
        dispatch(setUser(updatedUser))
        return updatedUser
    }
}




const initialState = {}
const stockDiscussionReducer = (state = initialState, action) => {
    let newState;
    let newerState;
    switch (action.type) {
        case SET_DISCUSSION:
            newState = { ...state }
            newState = action.discussion
            return newState

        case ADD_DISCUSSION_COMMENT:
            newState = {...state}
            newState.comments.push(action.comment)
            return newState
        case REMOVE_DISCUSSION_COMMENT:
            newState = {...state}
            newState.comments.forEach((comment, idx) => {
                if (comment.id === action.comment.id){
                    delete newState.comments[idx]
                }
            })
            newerState = newState.comments.filter(el =>{
                return el != null;
            })
            newState.comments = newerState
            return newState
        case EDIT_DISCUSSION_COMMENT:
            newState = {...state}
            newState.comments.forEach((comment, idx) => {
                if (comment.id === action.comment.id){
                    newState.comments[idx] = action.comment
                }
            })
            return newState
        default:
            return state
    }
};



export default stockDiscussionReducer
