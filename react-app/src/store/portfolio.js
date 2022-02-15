const SET_PORTFOLIO = "portfolio/setPortfolio"

const setPortfolio = (portfolioDetails) =>{
    return {
        type: SET_PORTFOLIO,
        portfolioDetails
    }
}

export const getPortfolioDetails = (id) => async (dispatch) => {
    console.log("ID IN STORE", id)
    const res = await fetch(`/api/portfolio/${id}`)
    if(res.ok) {
        const portfolioDetails = await res.json();
        console.log("PORT DETAIL IN STORE". portfolioDetails)
        dispatch(setPortfolio(portfolioDetails))
        return portfolioDetails
    }
}

const initialState = {}
const portfolioReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_PORTFOLIO:
            newState = { ...state }
            newState.portfolioDetail = action.portfolioDetails
            return newState

        default:
            return state
    }
};



export default portfolioReducer
