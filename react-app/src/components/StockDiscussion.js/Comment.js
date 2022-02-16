import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDiscussionDetails } from "../../store/stockDiscussion";

const Comment = ({comment}) => {
    // const [isLoaded, setIsLoaded] = useState(false)
    // const ticker = useParams()
  const dispatch = useDispatch();
//   const [showForm, setShowForm] = useState(false);

//   const user = useSelector((state) => state.session.user);

// console.log("STOCK DIOSCUSS IN COMP", stockDiscussion)

    return (
        <>
            <div>
                User: {comment.user.username}
            <div>
            {comment.comment}
            <div>
            {comment.likes.length} likes
            </div>
            </div>
            </div>

  </>
  );

}

export default Comment;
