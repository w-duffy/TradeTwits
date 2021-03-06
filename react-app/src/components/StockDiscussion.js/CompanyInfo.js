import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import './companyInfo.css'
import { addTicker } from "../../store/session";
import { delPortfolioTicker } from "../../store/portfolio";
import { Oval } from  'react-loader-spinner'


const CompanyInfo = ({stockDiscussion}) => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
    const [watchSpinner, setWatchSpinner] = useState(false)


  const handleAddTicker = (e) => {
    e.preventDefault();
    const ticker = stockDiscussion.ticker
    let user_id = user.id
    let id = user.id
    let portCheck = user.portfolio.filter(portfolio =>{
        return portfolio.ticker === ticker
      })
      if (portCheck.length > 0){
        window.alert("You cannot add an existing ticker to your portfolio")
        return;
      }
    async function addToPortfolio() {
        await setWatchSpinner(true)
        await dispatch(addTicker(ticker, user_id))
        await setWatchSpinner(false)
        // await dispatch(getPortfolioDetails(id))
    }
    addToPortfolio()
}

const handleDeleteTicker = async (e) => {
    e.preventDefault()
    let id = user.id
    let ticker = stockDiscussion.ticker
    await setWatchSpinner(true)
    await dispatch(delPortfolioTicker(ticker, id))
    await setWatchSpinner(false)
    // await dispatch(getPortfolioDetails(id))
}
let inPortfolio = user.portfolio.filter(detail =>{
    return detail.ticker === stockDiscussion.ticker
})


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
{stockDiscussion.ticker}
<div className="co-info-ticker-price">
{stockDiscussion.price.toFixed(2)}
</div>
              </div>
              <div className="co-info-p-change">
                  <div>
                  Daily Change
                  </div>
                    {stockDiscussion.percent_change < 0 && (

                        <div className="co-p-change-red">
                  <img className="down-arrow" alt="down-pic" src="https://img.icons8.com/external-rabit-jes-flat-rabit-jes/62/000000/external-direction-navigation-and-maps-rabit-jes-flat-rabit-jes-3.png"/> {stockDiscussion.percent_change.toFixed(2)} %
                  </div>
                      )}
            {stockDiscussion.percent_change > 0 && (

<div className="co-p-change-green">
<img alt="up-pic" src="https://img.icons8.com/office/16/000000/up--v1.png"/> +{stockDiscussion.percent_change.toFixed(2)} %
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
              {watchSpinner &&(
                            <div className="watch-spinner">

                        <Oval color="#00BFFF" height={25} width={25} />
                        </div>
                            )}
                {inPortfolio.length === 0 && (
                    <button className="watch-button" onClick={(e) => {handleAddTicker(e)}}>

                        <div>
                        <img className="watch-icon" alt="watch-pic" src="https://img.icons8.com/ios-filled/50/000000/visible--v1.png"/>
                                     </div>
                        <div>

                        Watch
                        </div>

                        </button>
                )}
                {inPortfolio.length > 0 && (
                    <>

                    <button className="watch-button-unwatch" onClick={(e) => {handleDeleteTicker(e)}}>

                        <div>

                        <img className="watch-icon" alt="watch-pic" src="https://img.icons8.com/ios-filled/50/000000/visible--v1.png"/>                        </div>
                        <div>
                        Unwatch
                        </div>

                        </button>
                    </>
                )}

              </div>
          </div>



      </div>
      </>
    );

};

export default CompanyInfo;
