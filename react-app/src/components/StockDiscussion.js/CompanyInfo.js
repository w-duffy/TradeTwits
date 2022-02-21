import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './companyInfo.css'
import { addTicker } from "../../store/session";
import { getPortfolioDetails, delPortfolioTicker } from "../../store/portfolio";


const CompanyInfo = ({stockDiscussion}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ticker = useParams();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showEditPortfolio, setEditPortfolio] = useState(false);
  const user = useSelector((state) => state.session.user);
  const portfolioDetail = useSelector(state => state.portfolioReducer)

  const handleAddTicker = (e) => {
    e.preventDefault();
    const ticker = stockDiscussion.ticker
    let user_id = user.id
    let id = user.id
    async function addToPortfolio() {
        console.log("TICKER", ticker)
        console.log("ID", id)
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

}
    let inPortfolio = portfolioDetail.filter(item =>{
        return item.ticker === stockDiscussion.ticker
    })
    console.log(inPortfolio)
    return (
      <>
      <div className="top-container">
          <div className="top-left">
          <div className="co-info-company-name">
              company name updated at
          </div>
          <div className="co-nfo-ticker-p-change">
              <div className="co-info-ticker">
{stockDiscussion.ticker} - {stockDiscussion.price.toFixed(2)}
              </div>
              <div className="co-info-p-change">
                  % change
                  </div>
          </div>
          </div>
          <div className="top-right">
              <div className="amount-of-watchers">
              Amount of watchers
              </div>
              <div className="add-co-to-portfolio">
                {inPortfolio.length === 0 && (
                    <button onClick={(e) => {handleAddTicker(e)}}>Add to Portfolio</button>
                )}
                {inPortfolio.length > 0 && (
                    <button onClick={(e) => {handleDeleteTicker(e)}}>Delete from Portfolio</button>
                )}
              </div>
          </div>
      </div>
      </>
    );

};

export default CompanyInfo;
