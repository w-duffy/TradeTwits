import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Graph from './Graph';
import {getPortfolioDetails} from '../../store/portfolio'

function PortfolioGraph(){
    const [isLoaded, setIsLoaded] = useState(false)
    // const [portDetails, setPortDetails] = useState()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const portfolioDetail = useSelector(state => state.portfolioReducer.portfolioDetail)

    useEffect(() => {
          const id = user.id

          console.log("ID IN COMPON", id)
        async function getDetails() {
            await dispatch(getPortfolioDetails(id))
            setIsLoaded(true)
            console.log("PORTFOLIO INFO IN COMPN", portfolioDetail.info)
            // setPortDetails(portfolioDetail.info)
          }
        getDetails()

    }, [])

      //for the slice make the second number a variable that will change with a useEffect when the user clicks how many days to view.


    if (isLoaded){

        return (
            <div>
            {portfolioDetail.info.map(detail => (
                <>
                {detail.ticker} {Number(detail.values[0]).toFixed(2)}
                <Graph values={detail.values} dates={detail.dates}/>
                </>
            ))}
        </div>
    )
} else return(<></>)
}

export default PortfolioGraph
