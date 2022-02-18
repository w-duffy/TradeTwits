import {setUser} from './session'


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
