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
const Reply = ({ reply }) => {
  // const [isLoaded, setIsLoaded] = useState(false)
  // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedReply, setUpdatedReply] = useState("")

  // const [updatedReply, setUpdatedReply] = useState("")

  //   const [showForm, setShowForm] = useState(false);

  const user = useSelector((state) => state.session.user);

  // console.log("STOCK DIOSCUSS IN COMP", stockDiscussion)
  // const handleEditreply = async (e, replyId) => {
  //     e.preventDefault()
  //     let id = replyId
  //     let newreply = updatedreply
  //     await dispatch(editDiscussionreply(id, newreply))
  //     await setShowEditForm(!showEditForm)
  // }

  // const handleAddLike = (e, reply) => {
  //   e.preventDefault();
  //   console.log(reply)
  //   let replyId = reply.id
  //   let user_id = user.id

  //   let userLiked = reply.likes.filter(like =>{
  //     return like.user_id === user.id
  //   })

  //   if (userLiked.length === 0) {
  //     // dispatch(addreplyLike(replyId, user_id))
  //   }
  //   if (userLiked.length > 0) {
  //     let likeId = userLiked[0].id
  //     // dispatch(deletereplyLike(likeId, user_id, replyId))
  //   }

  //   // setNewTick(!newTick)
  // }

  // const handleAddFollow = (e, id) => {
  //   e.preventDefault();
  //   console.log(id)
  //   let userToFollowId = id
  //   let user_id = user.id

  //   let currentlyFollowed = user.following.filter(follow =>{
  //     return follow.user_id === userToFollowId
  //   })

  //   if (currentlyFollowed.length === 0) {
  //     dispatch(addNewFollower(userToFollowId, user_id))
  //   }

  //   if (currentlyFollowed.length > 0) {
  //     let followId = currentlyFollowed[0].id

  //     dispatch(deleteNewFollower(followId, user_id, userToFollowId))
  //   }

  //   // setNewTick(!newTick)
  // }

  // let isFollower = user.following.map(follow =>{
  //   return follow.user_id
  // })

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


  return (
    <>
      <div>
        User: {reply.user.username}
        <div>
          {reply.reply}

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
