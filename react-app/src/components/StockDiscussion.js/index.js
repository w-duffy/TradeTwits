import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDiscussionDetails, addNewComment, delDiscussionComment } from "../../store/stockDiscussion";
import Comment from './Comment'
import Main from '../Main'



const StockDiscussion = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const ticker = useParams()
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState("")

  const user = useSelector((state) => state.session.user);
  const stockDiscussion = useSelector(state => state.stockDiscussionReducer)

  useEffect(() => {

  async function getDiscussion() {
      await dispatch(getDiscussionDetails(ticker.ticker))
      setIsLoaded(true)
    }
    getDiscussion()

}, [])


const handleAddComment = (e) => {
    e.preventDefault();
    const comment = newComment
    let user_id = user.id
    let stock_discussion_id = stockDiscussion.id
    dispatch(addNewComment(comment, user_id, stock_discussion_id))
    setNewComment("")
    setShowForm(!showForm)
    // setNewTick(!newTick)
}

const handleDeleteComment = async (e, commentId) => {
    e.preventDefault()
    let id = commentId
    await dispatch(delDiscussionComment(id))
}


if (isLoaded){

    return (
        <>
        <h1>{stockDiscussion.ticker} - {stockDiscussion.price.toFixed(2)}</h1>
        <button
        onClick={(e) => setShowForm(!showForm)}
      >
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
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      <h1>Portfolio</h1>
      <Main />

      <div>

        {stockDiscussion.comments.map(comment => (
          <div>
            <br></br>
            <Comment key={comment.id} comment={comment} />
            {comment.user_id === user.id && (

              <button onClick={(e) => {handleDeleteComment(e, comment.id)}}>DELETE COMMENT</button>
            )}
            </div>

))}
</div>
  </>
  );
} else return(<></>)
}

export default StockDiscussion;
