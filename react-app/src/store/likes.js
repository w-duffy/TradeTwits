import { editComment } from "./stockDiscussion";


export const addCommentLike = (id, user_id) => async (dispatch) =>{
    const res = await fetch(`/api/like/new/${id}`, {
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
    const res = await fetch(`/api/like/delete/${likeId}`, {
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

export const addReplyLike = (replyId, user_id, commentId) => async (dispatch) =>{
    console.log("IN COMP1", replyId, user_id, commentId)
    const res = await fetch(`/api/like/reply/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            replyId,
            user_id,
            commentId
        })
    })
    if (res.ok){
        const newReplyLikeComment = await res.json();
        console.log("In comp2", newReplyLikeComment)
        dispatch(editComment(newReplyLikeComment))
        return newReplyLikeComment
    }
}

export const deleteReplyLike = (likeId, user_id, replyId, commentId) => async (dispatch) =>{
    console.log("IN COMP3", replyId, user_id, replyId, commentId)
    const res = await fetch(`/api/like/reply/delete/${likeId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id,
            likeId,
            replyId,
            commentId
        })
    })
    if (res.ok){
        const deletedReplyLikeComment = await res.json();
        dispatch(editComment(deletedReplyLikeComment))
        console.log("In comp5", deletedReplyLikeComment)
        return deletedReplyLikeComment
    }
}
