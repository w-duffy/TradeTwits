import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDiscussionDetails,
  addNewComment,
} from "../../store/stockDiscussion";
import Comment from "./Comment";
import Main from "../Main";
import './stockdiscussion.css'
import CompanyInfo from "./CompanyInfo";
import DiscussionGraph from "./DiscussionGraph";
import { getStockDiscussionGraph } from "../../store/stockDiscussionGraph";
import KeyData from "./KeyData";
import './comment.css'
import { tickers } from "../Search/tickers";
import { useHistory } from "react-router-dom";
import { Oval } from  'react-loader-spinner'


const StockDiscussion = ({tickerSearch, handleWatchlistRoute}) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDiscussionLoaded, setIsDiscussionLoaded] = useState(false);
  const ticker = useParams();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showEditPortfolio, setEditPortfolio] = useState(false);
  const user = useSelector((state) => state.session.user);
  const stockDiscussion = useSelector((state) => state.stockDiscussionReducer);
  const stockDiscussionGraph = useSelector((state) => state.stockDiscussionGraphReducer)
  const history = useHistory();

useEffect(() =>{

  if(!tickers.includes(tickerSearch) && !tickers.includes(ticker.ticker)){
    window.alert("This ticker does not exist on TradeTwits.  Please try a different ticker.")
    history.push('/')
  }
}, [])

  useEffect(() => {
    async function getDiscussion() {
      if(!tickerSearch){
        await setIsDiscussionLoaded(true)
        await dispatch(getDiscussionDetails(ticker.ticker));
        await dispatch(getStockDiscussionGraph(ticker.ticker))
        await setIsDiscussionLoaded(false)
        await setIsLoaded(true);
      }
      if(tickerSearch) {
        await setIsDiscussionLoaded(true)
        await dispatch(getDiscussionDetails(tickerSearch));
        await dispatch(getStockDiscussionGraph(tickerSearch))
        await setIsDiscussionLoaded(false)
        await setIsLoaded(true);
      }
    }
    getDiscussion();
  }, [tickerSearch]);



  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = newComment;
    let user_id = user.id;
    let stock_discussion_id = stockDiscussion.id;
    if(comment.length < 1){
      window.alert("You cannot submit a blank comment")
      return;
    }
    if(comment.length > 255){
      window.alert("Your comment must be less than 255 characters")
      return;
    }
    dispatch(addNewComment(comment, user_id, stock_discussion_id));
    setNewComment("");
    setShowForm(!showForm);
    document.body.style.overflow = 'unset';
  };

//   useEffect(() => {
//     const id = user.id

//       async function getDetails() {
//       await dispatch(getPortfolioDetails(id))
//     }
//   getDetails()

// }, [])


  if (isLoaded) {

    return (
      <>
      <div className="main-container-discussion">
      <div className="portfolio">
      <div className="port-border">
            <div className="portfolio-name">
              Watchlist

     <div onClick={(e) => setEditPortfolio(!showEditPortfolio)} className="comment-icon-container">
      <img className="edit-icon" alt="edit-pic" src="https://img.icons8.com/ios/50/000000/more.png"/>
      </div>
              </div>
            <div>


        <Main key={user.id} handleWatchlistRoute={handleWatchlistRoute} showEditPortfolio={showEditPortfolio} />
            </div>
        </div>
      </div>
      <div className="discussion-feed-main">
        <>
        {isDiscussionLoaded && (

          <div className="landing-page-spinner">
    <div className="loading-text">
Loading latest stock data...
</div>
<div>
    <Oval color="#00BFFF" height={100} width={100} />
</div>

    </div>
        )}
      {!isDiscussionLoaded && (
        <>
        <div>
          <CompanyInfo key={stockDiscussion.id} stockDiscussion={stockDiscussion} />
        </div>
        <div className="discussion-graph">
          <DiscussionGraph cp={stockDiscussion.price} time={stockDiscussion.time_graph} key={stockDiscussion.id} values={stockDiscussionGraph[0].values} dates={stockDiscussionGraph[0].dates} />
        </div>
        <br></br>
      <KeyData stockDiscussion={stockDiscussion} />
        <br></br>
        {/* <button onClick={(e) => setShowForm(!showForm)}>
          Share your thoughts on {stockDiscussion.ticker}
        </button> */}
        {true && (
          <form onSubmit={handleAddComment}>
            <div className="larger-comment-container">

                          <img className="comment-prof-pic" alt="comment-pic" src={user.profile_picture}>

</img>
            <div className="add-comment-container">

              <textarea className="add-comment-textarea"
                name="Add Comment"
                placeholder={`Share your thoughts on ${stockDiscussion.ticker}`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div className="post-button-container">

              <button className="post-comment-button" type="submit">Post</button>
                </div>
            </div>
          </div>
          </form>
        )}
        <br></br>
          {stockDiscussion.comments && (
            <>
            {stockDiscussion.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
              ))}
              </>

)}

  </>
)}
                    </>
          </div>
          <>
          {!isDiscussionLoaded && (

            <div className="news">
              <div className="news-border">

              <div className="news-title">
                {stockDiscussion.ticker} News
                </div>
                {stockDiscussion.company_news.length === 0 && (
                  <>
                  <div className="no-news-div">
                    No news for {stockDiscussion.ticker} available
                  </div>
                  </>
                )}
                {stockDiscussion.company_news.length > 0 && stockDiscussion.company_news.slice(0, 10).map((news) => (
                  <div className="news-container-here">

                  <a className="a-news" rel="noreferrer" target="_blank" href={news.url}>
                  <div className="news-headline">
                    {news.headline}
                  </div>
                  <div className="news-source">
                  <i>Source: {news.source}</i>
                    </div>
                </a>

                  </div>
                  ))}
                  </div>

          </div>
                  )}
                  </>

                  </div>
      </>
    );
  } else return <>
    <div className="landing-page-spinner">
    <div className="loading-text">
Loading latest stock data...
</div>
<div>
    <Oval color="#00BFFF" height={100} width={100} />
</div>

    </div>
  </>;
};

export default StockDiscussion;
