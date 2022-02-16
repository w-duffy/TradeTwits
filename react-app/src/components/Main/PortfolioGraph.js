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


    if (isLoaded){

        return (
            <div>
            {portfolioDetail.map(detail => (
                <>
                {detail.ticker} {Number(detail.values[0]).toFixed(2)}
                <Graph values={detail.values} dates={detail.dates}/>
                <button onClick={(e) => {handleDeleteTicker(e, detail.ticker)}}>DELETE {detail.ticker}</button>
                </>
            ))}
        </div>
    )
} else return(<></>)
}

export default PortfolioGraph
