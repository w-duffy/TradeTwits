import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Graph from './Graph';
import {delPortfolioTicker} from '../../store/portfolio'
import { createBrowserHistory } from "history";

import { Oval } from  'react-loader-spinner'


function PortfolioGraph({ showEditPortfolio, loaded, handleWatchlistRoute}){
    const dispatch = useDispatch()
    const [delLoader, setDelLoader] = useState(false);
    const browserHistory = createBrowserHistory();

    const user = useSelector(state => state.session.user)
    const stockDiscussion = useSelector((state) => state.stockDiscussionReducer);

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
            await setDelLoader(true)
            let id = user.id
            let ticker = tickDetail
            await dispatch(delPortfolioTicker(ticker, id))
            await setDelLoader(false)
        }


        return (
          <>
            <div className='main-port-container'>
            {user.portfolio.map(detail => (
                <>
                <div className='portfolio-details-container'>


                        <div className='del-stock'>
                    {showEditPortfolio && (


                      <img className="trash-can" alt="trash-can" onClick={(e) => {handleDeleteTicker(e, detail.ticker)}} src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"/>

                    )}
</div>

                <div className='stock-name'>
                    <div>
                    {stockDiscussion.id && (

                      <a  className="a-select" onClick={(e) => {handleWatchlistRoute(e, detail.ticker); browserHistory.push(`/discussion/${detail.ticker}`)}}>
                {detail.ticker}
                </a>
                  )}
                {/* href={`/discussion/${detail.ticker}`} */}
                {!stockDiscussion.id && (

<a  className="a-select" href={`/discussion/${detail.ticker}`}>
{detail.ticker}
</a>
)}
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
               {!loaded && (
                <div className='spinner'>
  <Oval color="#00BFFF" height={65} width={65} />
  </div>

)}

               {delLoader && (
                <div className='spinner'>
  <Oval color="#00BFFF" height={65} width={65} />
  </div>

)}
</>
    )

}

export default PortfolioGraph
