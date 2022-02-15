const SET_PORTFOLIO = "portfolio/setPortfolio"
const DELETE_PORTFOLIO_TICKER = "portfolio/delPortfolioTicker"

const setPortfolio = (portfolioDetails) =>{
    return {
        type: SET_PORTFOLIO,
        portfolioDetails
    }
}

export const getPortfolioDetails = (id) => async (dispatch) => {
    const res = await fetch(`/api/portfolio/${id}`)
    if(res.ok) {
        const portfolioDetails = await res.json();
        dispatch(setPortfolio(portfolioDetails))
        return portfolioDetails
    }
}

const delTicker = (ticker) => {
    return {
        type: DELETE_PORTFOLIO_TICKER,
        ticker
    }
}

export const delPortfolioTicker = (ticker, id) => async (dispatch) => {
    const res = await fetch(`/api/portfolio/delete/${ticker}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ticker,
            id
        })
    })
    if(res.ok){
        const details = await res.json();
        dispatch(delTicker(details['ticker']))
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
        case DELETE_PORTFOLIO_TICKER: {
            newState = { ...state };

            newState.portfolioDetail.info.forEach((item, idx) =>{
                if (item.ticker === action.ticker){
                    delete newState.portfolioDetail.info[idx]
                }
            })


            return newState
        }
        default:
            return state
    }
};



export default portfolioReducer
