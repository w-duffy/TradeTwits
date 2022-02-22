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
import { getPortfolioDetails } from "../../store/portfolio";
import KeyData from "./KeyData";

const StockDiscussion = ({tickerSearch}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ticker = useParams();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showEditPortfolio, setEditPortfolio] = useState(false);
  const user = useSelector((state) => state.session.user);
  const stockDiscussion = useSelector((state) => state.stockDiscussionReducer);
  const stockDiscussionGraph = useSelector((state) => state.stockDiscussionGraphReducer)

  useEffect(() => {
    async function getDiscussion() {
      if(!tickerSearch){
        await dispatch(getDiscussionDetails(ticker.ticker));
        await dispatch(getStockDiscussionGraph(ticker.ticker))
        setIsLoaded(true);
      }
      if(tickerSearch) {
        await dispatch(getDiscussionDetails(tickerSearch));
        await dispatch(getStockDiscussionGraph(tickerSearch))
        setIsLoaded(true);
      }
    }
    getDiscussion();
  }, [tickerSearch]);



  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = newComment;
    let user_id = user.id;
    let stock_discussion_id = stockDiscussion.id;
    dispatch(addNewComment(comment, user_id, stock_discussion_id));
    setNewComment("");
    setShowForm(!showForm);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const id = user.id

      async function getDetails() {
      await dispatch(getPortfolioDetails(id))
    }
  getDetails()

}, [])


  if (isLoaded) {

    return (
      <>
      <div className="main-container">
      <div className="portfolio">
            <div className="portfolio-name">Portfolio</div>
            <div>
            <button
        onClick={(e) => setEditPortfolio(!showEditPortfolio)}
        >
          Edit Portfolio
      </button>

        <Main key={user.id} showEditPortfolio={showEditPortfolio} />
            </div>
      </div>
      <div className="discussion-feed">

        <div>
          <CompanyInfo key={stockDiscussion.id} stockDiscussion={stockDiscussion} />
        </div>
        <div className="discussion-graph">
          <DiscussionGraph key={stockDiscussion.id} values={stockDiscussionGraph[0].values} dates={stockDiscussionGraph[0].dates} />
        </div>
        <br></br>
      <KeyData />
        <br></br>
        {/* <button onClick={(e) => setShowForm(!showForm)}>
          Share your thoughts on {stockDiscussion.ticker}
        </button> */}
        {true && (
          <form onSubmit={handleAddComment}>
            <div className="larger-comment-container">

                          <img className="comment-prof-pic" src={user.profile_picture}>

</img>
            <div className="add-comment-container">

              <textarea className="add-comment-textarea"
                name="Add Comment"
                placeholder={`Share your thoughts on ${stockDiscussion.ticker}`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
              <button className="post-comment-button" type="submit">Post</button>
            </div>
          </div>
          </form>
        )}
        <br></br>

          {stockDiscussion.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
          ))}

          </div>
              </div>
      </>
    );
  } else return <></>;
};

export default StockDiscussion;
