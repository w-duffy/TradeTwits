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
      await dispatch(getDiscussionDetails(tickerSearch));
      await dispatch(getStockDiscussionGraph(tickerSearch))
      setIsLoaded(true);
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
  };



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

        <Main showEditPortfolio={showEditPortfolio} />
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
        <button onClick={(e) => setShowForm(!showForm)}>
          Share your thoughts on {stockDiscussion.ticker}
        </button>
        {showForm && (
          <form onSubmit={handleAddComment}>
            <div>
              <input
                name="Add Ticker"
                placeholder="Enter your comment here.."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></input>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}


        <div>
          {stockDiscussion.comments.map((comment) => (
            <div>
              <br></br>
              <Comment key={comment.id} comment={comment} />
            </div>
          ))}
        </div>
          </div>
              </div>
      </>
    );
  } else return <></>;
};

export default StockDiscussion;
