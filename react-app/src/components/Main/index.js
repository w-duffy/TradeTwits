import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import PortfolioGraph from './PortfolioGraph';



const Main = () => {




    const user = useSelector(state => state.session.user)
    // const portArr = Object.values(user.portfolio)



    return (
        <>
        <PortfolioGraph />
        </>
    )
}

export default Main
