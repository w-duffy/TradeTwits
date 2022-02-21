const SET_DISCUSSION_PORTFOLIO = "portfolio/SET_DISCUSSION_PORTFOLIO"



const setPortfolio = (portfolioDetails) =>{
    return {
        type: SET_DISCUSSION_PORTFOLIO,
        portfolioDetails
    }
}

export const getStockDiscussionGraph = (ticker) => async (dispatch) => {
    const res = await fetch(`/api/discussion/graph/${ticker}`)
    if(res.ok) {
        const portfolioDetails = await res.json();
        dispatch(setPortfolio(portfolioDetails))
        return portfolioDetails
    }
}




const initialState = {}
const stockDiscussionGraphReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_DISCUSSION_PORTFOLIO:
            newState = { ...state }
            newState = action.portfolioDetails.info
            return newState

        default:
            return state
    }
};



export default stockDiscussionGraphReducer
