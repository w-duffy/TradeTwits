import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './companyInfo.css'
import { addTicker } from "../../store/session";
import { getPortfolioDetails, delPortfolioTicker } from "../../store/portfolio";


const CompanyInfo = ({stockDiscussion}) => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const portfolioDetail = useSelector(state => state.portfolioReducer)



  const handleAddTicker = (e) => {
    e.preventDefault();
    const ticker = stockDiscussion.ticker
    let user_id = user.id
    let id = user.id
    let portCheck = portfolioDetail.filter(portfolio =>{
        return portfolio.ticker === ticker
      })
      if (portCheck.length > 0){
        window.alert("You cannot add an existing ticker to your portfolio")
        return;
      }
    async function addToPortfolio() {
        await dispatch(addTicker(ticker, user_id))
        await dispatch(getPortfolioDetails(id))
    }
    addToPortfolio()
}

const handleDeleteTicker = async (e) => {
    e.preventDefault()
    let id = user.id
    let ticker = stockDiscussion.ticker
    await dispatch(delPortfolioTicker(ticker, id))
    await dispatch(getPortfolioDetails(id))
}

let inPortfolio = portfolioDetail.filter(detail =>{
    return detail.ticker == stockDiscussion.ticker
})


    // let currentTime = time.toISOString().split('T')[0]
    return (
      <>
      <div className="top-container">
          <div className="top-left">
          <div className="co-info-company-name">
              <div className="top-discuss-name">
              {stockDiscussion.name}
              </div>
              <div>
              - Updated {stockDiscussion.time}
              </div>

          </div>
          <div className="co-info-ticker-p-change">
              <div className="co-info-ticker">
{stockDiscussion.ticker} - {stockDiscussion.price.toFixed(2)}
              </div>
              <div className="co-info-p-change">
                  <div>
                  Daily Change
                  </div>
                    {stockDiscussion.percent_change < 0 && (

                        <div className="co-p-change-red">
                  <img className="down-arrow" src="https://img.icons8.com/external-rabit-jes-flat-rabit-jes/62/000000/external-direction-navigation-and-maps-rabit-jes-flat-rabit-jes-3.png"/> {stockDiscussion.percent_change.toFixed(2)} %
                  </div>
                      )}
            {stockDiscussion.percent_change > 0 && (

<div className="co-p-change-green">
<img src="https://img.icons8.com/office/16/000000/up--v1.png"/> {stockDiscussion.percent_change.toFixed(2)} %
</div>
)}
                  </div>
          </div>
          </div>
          <div className="top-right">
              {/* <div className="amount-of-watchers">
              Amount of watchers
              </div> */}
              <div className="add-co-to-portfolio">
                {inPortfolio.length === 0 && (
                    <button className="watch-button" onClick={(e) => {handleAddTicker(e)}}>
                        <div>
                        <img className="watch-icon" src="https://img.icons8.com/ios-filled/50/000000/visible--v1.png"/>
                                     </div>
                        <div>

                        Watch
                        </div>
                        </button>
                )}
                {inPortfolio.length > 0 && (
                    <button className="watch-button-unwatch" onClick={(e) => {handleDeleteTicker(e)}}>
                        <div>

                        <img className="watch-icon" src="https://img.icons8.com/ios-filled/50/000000/visible--v1.png"/>                        </div>
                        <div>
                        Unwatch
                        </div>
                        </button>
                )}
              </div>
          </div>
      </div>
      </>
    );

};

export default CompanyInfo;
