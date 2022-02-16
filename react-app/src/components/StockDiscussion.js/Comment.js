import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editDiscussionComment } from "../../store/stockDiscussion";

const Comment = ({comment}) => {
    // const [isLoaded, setIsLoaded] = useState(false)
    // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("")


//   const [showForm, setShowForm] = useState(false);

//   const user = useSelector((state) => state.session.user);

// console.log("STOCK DIOSCUSS IN COMP", stockDiscussion)
const handleEditComment = async (e, commentId) => {
    e.preventDefault()
    let id = commentId
    let newComment = updatedComment
    await dispatch(editDiscussionComment(id, newComment))
    await setShowEditForm(!showEditForm)
}

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
            <button
        onClick={(e) => setShowEditForm(!showEditForm)}
      >
          EDIT
      </button>
      {showEditForm && (
        <form onSubmit={(e) => {handleEditComment(e, comment.id)}}>
          <div>
            <input
              name="Edit Comment"
              placeholder={comment.comment}
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            ></input>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      )}

  </>
  );

}

export default Comment;
