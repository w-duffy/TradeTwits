import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editDiscussionComment, addCommentLike, deleteCommentLike, addNewFollower } from "../../store/stockDiscussion";

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

const handleAddFollow = (e, id) => {
  e.preventDefault();
  console.log(id)
  let userToFollowId = id
  let user_id = user.id
  console.log("USER TO FOLLOW comp", userToFollowId)
  console.log("USER comp", user_id)
  let currentlyFollowed = user.following.filter(follow =>{
    return follow.user_id === userToFollowId
  })
  console.log("Current followed", currentlyFollowed)
  if (currentlyFollowed.length === 0) {
    dispatch(addNewFollower(userToFollowId, user_id))
  }
  // if (currentlyFollowed.length > 0) {
  //   let followId = currentlyFollowed[0].id
  //   dispatch(deleteCommentLike(followId, user_id, userToFollowId))
  // }

  // setNewTick(!newTick)
}



    return (
        <>
            <div>
                User: {comment.user.username}
                <button onClick={(e) => {handleAddFollow(e, comment.user_id)}}>
                  follow
                </button>
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
