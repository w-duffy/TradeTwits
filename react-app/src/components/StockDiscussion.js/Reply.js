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
    if(editedReply.length < 1){
      window.alert("You cannot submit a blank reply")
      return;
    }
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


let hasLiked = reply.likes.filter(like =>{
  return like.user_id === user.id
})

return (
    <>
    <div className="comment-container">
      <div className="comment-body-div-prof-pic">
        <img className="comment-body-prof-pic" src={reply.user.profile_picture}></img>
      </div>
      <div className="comment-body-container">
      <div className="comment-body-first-row">
      <div className="username-posted">
        <div className="comment-top-row-username">
        {reply.user.username}
        </div>
        <div className="comment-top-row-updated">
        {reply.time_updated}
        </div>
      </div>
      <div> delete</div>
      </div>
      <div className="comment-body-comment">
            {reply.reply}
      </div>

      <div className="comment-body-bottom-row">

      <div className="comment-icon-container"
            onClick={(e) => {
              handleAddReplyLike(e, reply);
            }}
            >
              {hasLiked.length === 0 && (
                <div>
              <img className="comment-like-pic" src="https://img.icons8.com/external-flat-icons-inmotus-design/67/000000/external-frame-flat-feelings-flat-icons-inmotus-design.png"/>
              </div>
                )}
                {hasLiked.length > 0 && (
                    <div>
                  <img className="comment-like-pic" src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-heart-miscellaneous-kiranshastry-lineal-color-kiranshastry.png"/>
                    </div>
                )}
              <div>
            {reply.likes.length}
              </div>
          </div>

      </div>


      {reply.user_id === user.id && (
        <>
          <button onClick={(e) => setShowEditForm(!showEditForm)}>
            EDIT reply
          </button>
          <button
            onClick={(e) => {
              handleDeleteReply(e, reply.id);
            }}
            >
            DELETE reply
          </button>
        </>
      )}
      {showEditForm && (
        <form
          onSubmit={(e) => {
            handleEditReply(e, reply.id);
          }}
        >
          <div>
            <input
              name="Edit Comment"
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





























{/*




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
      </div> */}
    </>
  );
};

export default Reply;
