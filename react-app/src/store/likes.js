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
