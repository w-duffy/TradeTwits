const SET_PORTFOLIO = "portfolio/SET_PORTFOLIO"
const REMOVE_PORTFOLIO_TICKER = "portfolio/REMOVE_PORTFOLIO_TICKER"
// const ADD_PORTFOLIO_TICKER = "portfolio/addPortfolioTicker"

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
        type: REMOVE_PORTFOLIO_TICKER,
        ticker
    }
}

export const delPortfolioTicker = (ticker, id) => async (dispatch) => {
    console.log("IN DELETE STORE", ticker, id)
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
        console.log("DELETE DETAIL:S", details)
        dispatch(delTicker(details['ticker']))
    }
}

// const add = (ticker) => {
//     return {
//         type: ADD_PORTFOLIO_TICKER,
//         ticker
//     }
// }




const initialState = {}
const portfolioReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_PORTFOLIO:
            newState = { ...state }
            newState = action.portfolioDetails.info
            return newState
        // case ADD_PORTFOLIO_TICKER:
        //     newState = [...state]
        //     console.log("STATE", newState)
        //     newState.push(action.ticker)
        //     console.log("NEWWWW STATE", newState)

        //     // [action.ticker.id]: action.ticker

        //     return newState
        case REMOVE_PORTFOLIO_TICKER: {
            newState = [ ...state ];
            // console.log("NEW STATETET", newState)
            newState.forEach((item, idx) =>{
                if (item.ticker === action.ticker){
                    delete newState[idx]
                }
            })


            return newState
        }
        default:
            return state
    }
};



export default portfolioReducer
