const SET_DISCUSSION = "portfolio/SET_DISCUSSION"



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





const initialState = {}
const stockDiscussionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_DISCUSSION:
            newState = { ...state }
            newState = action.discussion
            return newState

        default:
            return state
    }
};



export default stockDiscussionReducer
