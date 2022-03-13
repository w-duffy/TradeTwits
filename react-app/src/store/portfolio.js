import { setUser } from "./session"
const SET_PORTFOLIO = "portfolio/SET_PORTFOLIO"
const REMOVE_PORTFOLIO_TICKER = "portfolio/REMOVE_PORTFOLIO_TICKER"


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

// const delTicker = (ticker) => {
//     return {
//         type: REMOVE_PORTFOLIO_TICKER,
//         ticker
//     }
// }

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
        dispatch(setUser(details))
        // dispatch(delTicker(details['ticker']))
    }
}



const initialState = {}
const portfolioReducer = (state = initialState, action) => {
    let newState;
    let newestState;
    switch (action.type) {
        case SET_PORTFOLIO:
            newState = { ...state }
            newState = action.portfolioDetails.info
            return newState

        case REMOVE_PORTFOLIO_TICKER: {
            newState = [ ...state ];
            newState.forEach((item, idx) =>{
                if (item.ticker === action.ticker){
                    delete newState[idx]
                }
            })

            newestState = newState.filter(el =>{
                return el != null;
            })
            return newestState
        }
        default:
            return state
    }
};



export default portfolioReducer
