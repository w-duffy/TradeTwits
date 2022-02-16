const SET_DISCUSSION = "portfolio/SET_DISCUSSION"
const ADD_DISCUSSION_COMMENT = "portfolio/ADD_DISCUSSION_COMMENT"
const REMOVE_DISCUSSION_COMMENT = "portfolio/REMOVE_DISCUSSION_COMMENT"
const EDIT_DISCUSSION_COMMENT = "portfolio/EDIT_DISCUSSION_COMMENT"



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
