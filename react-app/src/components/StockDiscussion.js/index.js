import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDiscussionDetails } from "../../store/stockDiscussion";

const StockDiscussion = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const ticker = useParams()
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const user = useSelector((state) => state.session.user);
  const stockDiscussion = useSelector(state => state.stockDiscussionReducer)

  useEffect(() => {

  async function getDiscussion() {
      await dispatch(getDiscussionDetails(ticker.ticker))
      setIsLoaded(true)
    }
    getDiscussion()

}, [])
console.log("STOCK DIOSCUSS IN COMP", stockDiscussion.comments)

if (isLoaded){

    return (
        <>
        {stockDiscussion.comments.map(item => (
            <div>
                User: {item.user.username}
            <div>
            {item.comment}
            <div>
            {item.likes.length} likes
            </div>
            </div>
            </div>
        ))}
  </>
  );
} else return(<></>)
}

export default StockDiscussion;
