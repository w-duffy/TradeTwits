import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editDiscussionComment, addCommentLike, deleteCommentLike } from "../../store/stockDiscussion";

const Comment = ({comment}) => {
    // const [isLoaded, setIsLoaded] = useState(false)
    // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("")


//   const [showForm, setShowForm] = useState(false);

  const user = useSelector((state) => state.session.user);

// console.log("STOCK DIOSCUSS IN COMP", stockDiscussion)
const handleEditComment = async (e, commentId) => {
    e.preventDefault()
    let id = commentId
    let newComment = updatedComment
    await dispatch(editDiscussionComment(id, newComment))
    await setShowEditForm(!showEditForm)
}

const handleAddLike = (e, comment) => {
  e.preventDefault();
  console.log(comment)
  let commentId = comment.id
  let user_id = user.id

  let userLiked = comment.likes.filter(like =>{
    return like.user_id === user.id
  })

  if (userLiked.length === 0) {
    dispatch(addCommentLike(commentId, user_id))
  }
  if (userLiked.length > 0) {
    let likeId = userLiked[0].id
    dispatch(deleteCommentLike(likeId, user_id, commentId))
  }

  // setNewTick(!newTick)
}


    return (
        <>
            <div>
                User: {comment.user.username}
            <div>
            {comment.comment}
            <button onClick={(e) => {handleAddLike(e, comment)}}>
            {comment.likes.length} likes
            </button>
            </div>
            </div>

            {comment.user_id === user.id && (

              <button
              onClick={(e) => setShowEditForm(!showEditForm)}
              >
          EDIT
      </button>
                )}
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
