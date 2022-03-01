import {setUser} from './session'


export const addNewFollower = (userToFollowId, user_id) => async (dispatch) =>{
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
        dispatch(setUser(updatedUser))
        return updatedUser
    }
}

export const deleteNewFollower = (followId, user_id, userToFollowId) => async (dispatch) =>{
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
        dispatch(setUser(updatedUser))
        return updatedUser
    }
}
