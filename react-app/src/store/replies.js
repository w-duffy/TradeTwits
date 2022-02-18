import { editComment } from "./stockDiscussion";

export const addNewReply = (reply, user_id, comment_id) => async (dispatch) =>{
    const res = await fetch(`/api/reply/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            reply,
            user_id,
            comment_id
        })
    })
    if (res.ok){
        const result = await res.json();
        dispatch(editComment(result))
        return result
    }
  }

  export const delReply = (id, commentId) => async (dispatch) => {
    const res = await fetch(`/api/reply/delete/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id,
            commentId
        })
    })
    if(res.ok){
        const details = await res.json();
        dispatch(editComment(details))
    }
}

export const editReply = (id, editedReply, commentId) => async (dispatch) =>{
    console.log("st1", id, editedReply, commentId)
    const res = await fetch(`/api/reply/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id,
            editedReply,
            commentId
        })
    })
    if (res.ok){
        const commentWithNewReply = await res.json();
        console.log("st1", commentWithNewReply)
        dispatch(editComment(commentWithNewReply))
        return commentWithNewReply
    }
}
