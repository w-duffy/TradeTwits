import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Graph from './Graph';
import {getPortfolioDetails, delPortfolioTicker} from '../../store/portfolio'

function PortfolioGraph({newTick}){
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const portfolioDetail = useSelector(state => state.portfolioReducer)

    useEffect(() => {
          const id = user.id

        async function getDetails() {
            await dispatch(getPortfolioDetails(id))
            setIsLoaded(true)
          }
        getDetails()

    }, [newTick])


        const handleDeleteTicker = async (e, tickDetail) => {
            e.preventDefault()
            let id = user.id
            let ticker = tickDetail
            await dispatch(delPortfolioTicker(ticker, id))
        }

        const isTrue = false
    if (isLoaded){
        return (
            <div className='main-port-container'>
            {portfolioDetail.map(detail => (
                <>
                <div className='portfolio-details-container'>

                        <div className='del-stock'>
                    {isTrue && (

<button onClick={(e) => {handleDeleteTicker(e, detail.ticker)}}>X</button>
                    )}
</div>
                <div className='stock-name'>
                    <div>

                {detail.ticker}
                    </div>
                    <div className='port-co-name'>
                        Comapany
                    </div>
                </div>
                <div className='stock-graph'>

                <Graph key={detail.values[0]} values={detail.values} dates={detail.dates}/>
                </div>
                <div className='stock-price'>
                    <div>
                {Number(detail.values[0]).toFixed(2)}
                    </div>
                <div className='port-co-name'>
                    %change
                </div>
                </div>

                </div>

                </>
            ))}
        </div>
    )
} else return(<></>)
}

export default PortfolioGraph
