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

  export const delReply = (id) => async (dispatch) => {
    const res = await fetch(`/api/reply/delete/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    if(res.ok){
        const details = await res.json();
        dispatch(editComment(details))
    }
}
