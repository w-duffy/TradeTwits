import React, {useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Graph from './Graph';
import {delPortfolioTicker} from '../../store/portfolio'
import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom";


function PortfolioGraph({newTick, showEditPortfolio}){
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    // const portfolioDetail = useSelector(state => state.portfolioReducer)

    // useEffect(() => {
    //       const id = user.id

    //     async function getDetails() {
    //         await dispatch(getPortfolioDetails(id))
    //         setIsLoaded(true)
    //       }
    //     getDetails()

    // }, [newTick])


        const handleDeleteTicker = async (e, tickDetail) => {
            e.preventDefault()
            let id = user.id
            let ticker = tickDetail
            await dispatch(delPortfolioTicker(ticker, id))
        }


        return (
            <div className='main-port-container'>
            {user.portfolio.map(detail => (
                <>
                <div className='portfolio-details-container'>

                        <div className='del-stock'>
                    {showEditPortfolio && (


<img className="trash-can" onClick={(e) => {handleDeleteTicker(e, detail.ticker)}} src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"/>

                    )}
</div>
                <div className='stock-name'>
                    <div>

                <a  className="a-select" href={`/discussion/${detail.ticker}`}>
                {detail.ticker}
                </a>

{/* <a
                    className="a-select"
                    onClick={() => {
                    history.push(`/discussion/${detail.ticker}`)
                    }}
                  >
                    {detail.ticker}
                  </a> */}
                {/* {stockDiscussion.id && (
                  <a
                    className="a-select"
                    onClick={() => {
                    browserHistory.push(`/discussion/${detail.ticker}`);
                    }}
                  >
                    {detail.ticker}
                  </a>
                )}

                {!stockDiscussion.id && (
                  <a
                    className="a-select"
                    onClick={() => {
                    history.push(`/discussion/${detail.ticker}`);
                    }}
                  >
                    {detail.ticker}
                  </a>
                )} */}


















                    </div>
                    <div className='port-co-name'>
                        {detail.company_name}
                    </div>
                </div>
                <div className='stock-graph'>

                {/* <Graph key={detail.id} pclose={user.id} values={detail.values} dates={detail.dates}/> */}
                <Graph key={detail.id} pClose={detail.p_close} high={detail.high} low={detail.low} openP={detail.open} current={detail.current}  />

                </div>
                <div className='stock-price'>
                    <div>
                {/* {Number(detail.values[0]).toFixed(2)} */}
                {Number(detail.current).toFixed(2)}
                    </div>
                    {detail.p_change < 0 && (

                        <div className='port-co-name-pchange-r'>
                    {detail.p_change.toFixed(2)}%
                </div>
                    )}
                                     {detail.p_change > 0 && (

<div className='port-co-name-pchange-g'>
+{detail.p_change.toFixed(2)}%
</div>
)}
                </div>

                </div>

                </>
            ))}
        </div>
    )

}

export default PortfolioGraph
