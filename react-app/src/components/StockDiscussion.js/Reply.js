import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editDiscussionComment,
  addCommentLike,
  deleteCommentLike,
  addNewFollower,
  deleteNewFollower,
} from "../../store/stockDiscussion";
import { delReply, editReply } from "../../store/replies";
import { addReplyLike, deleteReplyLike } from "../../store/likes";

const Reply = ({ reply }) => {
  // const [isLoaded, setIsLoaded] = useState(false)
  // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedReply, setUpdatedReply] = useState("")



  const user = useSelector((state) => state.session.user);

  const handleDeleteReply = async (e, replyId) => {
    e.preventDefault();
    let id = replyId;
    let commentId = reply.comment_id;
    console.log("comp", id, commentId);
    await dispatch(delReply(id, commentId));
  };

  const handleEditReply = async (e, replyId) => {
    e.preventDefault()
    let id = replyId
    let commentId = reply.comment_id;
    let editedReply = updatedReply
    console.log("comp", id, commentId, editedReply)
    await dispatch(editReply(id, editedReply, commentId))
    await setShowEditForm(!showEditForm)
}
const handleAddReplyLike = (e, reply) => {
  e.preventDefault();
  console.log("REPLYCOMP", reply)
  let replyId = reply.id
  let user_id = user.id
  let commentId = reply.comment_id;
  let userLiked = reply.likes.filter(like =>{
    return like.user_id === user.id
  })
  console.log("USER LIKED ARR", userLiked)
  if (userLiked.length === 0) {
    console.log("REPLYCOMP 3", replyId, user_id, commentId)
    dispatch(addReplyLike(replyId, user_id, commentId))
  }
  if (userLiked.length > 0) {
    let likeId = userLiked[0].id
    console.log("REPLYCOMP 4", likeId, replyId, user_id, commentId)
    dispatch(deleteReplyLike(likeId, user_id, replyId, commentId))
  }

}


  return (
    <>
      <div>
        User: {reply.user.username}
        <div>
          {reply.reply}
          <button onClick={(e) => {handleAddReplyLike(e, reply)}}>
                {reply.likes.length} Reply likes
                </button>
          {/* <button onClick={(e) => {handleAddLike(e, reply)}}>
                {reply.likes.length} likes
                </button> */}
          <button
            onClick={(e) => {
              handleDeleteReply(e, reply.id);
            }}
          >
            DELETE Reply
          </button>
          {reply.user_id === user.id && (
            <button onClick={(e) => setShowEditForm(!showEditForm)}>
              EDIT REPLY
            </button>
          )}
          {showEditForm && (
            <form
              onSubmit={(e) => {
                handleEditReply(e, reply.id);
              }}
            >
              <div>
                <input
                  name="Edit Reply"
                  placeholder={reply.reply}
                  value={updatedReply}
                  onChange={(e) => setUpdatedReply(e.target.value)}
                ></input>
                <button type="submit">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Reply;
