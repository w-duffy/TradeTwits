import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    await dispatch(delReply(id, commentId));
  };

  const handleEditReply = async (e, replyId) => {
    e.preventDefault()
    let id = replyId
    let commentId = reply.comment_id;
    let editedReply = updatedReply
    await dispatch(editReply(id, editedReply, commentId))
    await setShowEditForm(!showEditForm)
}
const handleAddReplyLike = (e, reply) => {
  e.preventDefault();
  let replyId = reply.id
  let user_id = user.id
  let commentId = reply.comment_id;
  let userLiked = reply.likes.filter(like =>{
    return like.user_id === user.id
  })
  if (userLiked.length === 0) {
    dispatch(addReplyLike(replyId, user_id, commentId))
  }
  if (userLiked.length > 0) {
    let likeId = userLiked[0].id
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

          <button
            onClick={(e) => {
              handleDeleteReply(e, reply.id);
            }}
          >
            Delete Reply
          </button>
          {reply.user_id === user.id && (
            <button onClick={(e) => setShowEditForm(!showEditForm)}>
              Edit Reply
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
