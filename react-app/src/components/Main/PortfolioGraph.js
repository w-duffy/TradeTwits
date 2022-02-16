import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Graph from './Graph';
import {getPortfolioDetails, delPortfolioTicker} from '../../store/portfolio'

function PortfolioGraph({newTick}){
    const [isLoaded, setIsLoaded] = useState(false)
    const [deleteTicker, setDeleteTicker] = useState("")
    // const [portDetails, setPortDetails] = useState()
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

      //for the slice make the second number a variable that will change with a useEffect when the user clicks how many days to view.
    //   console.log("Ticker IN COMPONENT", deleteTicker)
    // const wrapperFunc = async (e, tickDetail) =>{
        // console.log("Ticker IN COMPONENT", deleteTicker)
        // await setDeleteTicker(tickDetail)
        // console.log("TICK DETAIL", tickDetail)
        const handleDeleteTicker = async (e, tickDetail) => {
            e.preventDefault()
            let id = user.id
            let ticker = tickDetail
            console.log("TICK DETAIL", tickDetail)
            await dispatch(delPortfolioTicker(ticker, id))
            await setDeleteTicker("")

        }
        // await handleDeleteTicker(e)

// }


            // setPortDetails(portfolioDetail.info)

        // await dispatch(loadUserWatchlists(user.id))
        // dispatch(loadWatchlistTickers(list.id))

    if (isLoaded){

        return (
            <div>
            {portfolioDetail.map(detail => (
                <>
                {detail.ticker} {Number(detail.values[0]).toFixed(2)}
                <Graph values={detail.values} dates={detail.dates}/>
                <button onClick={(e) => {setDeleteTicker(detail.ticker); handleDeleteTicker(e, detail.ticker)}}>DELETE {detail.ticker}</button>
                </>
            ))}
        </div>
    )
} else return(<></>)
}

export default PortfolioGraph
