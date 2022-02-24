import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delReply, editReply } from "../../store/replies";
import { addReplyLike, deleteReplyLike } from "../../store/likes";

const Reply = ({ reply, isFollower, handleAddFollow, prop = false }) => {
  // const [isLoaded, setIsLoaded] = useState(false)
  // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedReply, setUpdatedReply] = useState(reply.reply)
  const [showCommentMenu, setShowCommentMenu] = useState(false);



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
    setShowCommentMenu(!showCommentMenu);
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

const openCommentMenu = () => {
  setShowCommentMenu(!showCommentMenu);
};

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
      <div>

      <div className="edit-container-c">

<div onClick={openCommentMenu} className="comment-icon-container">
<img className="edit-icon" src="https://img.icons8.com/ios/50/000000/more.png"/>
                  </div>
          </div>

{/* <div className="ul-container-c"> */}

{showCommentMenu && user.id === reply.user_id && (
  <ul className="profile-ul-r">
              <li className="profile-li-c">
                <div onClick={() => {setShowEditForm(!showEditForm); setShowCommentMenu(!showCommentMenu)}} className="profile-a-c">
                  Edit Reply
                </div>
              </li>

              {/* <li className="profile-li">
                <a className="profile-a" href="/my-profile">
                  Edit Profile
                  </a>
              </li> */}

              <li className="profile-li-c">
                <div
                  className="profile-a-c"

                  onClick={(e) => {
                    handleDeleteReply(e, reply.id);
                  }}
                  >
                  Delete Reply
                </div>
              </li>
            </ul>
          )}

{showCommentMenu && user.id !== reply.user_id && (
        <ul className="profile-ul-f">
          {isFollower.includes(reply.user.id) && (
                    <li className="profile-li-c">
                      <div onClick={(e) => {handleAddFollow(e, reply.user_id); setShowCommentMenu(!showCommentMenu)}} className="profile-a-c">
                        Unfollow
                      </div>
                    </li>
 )}
                    {/* <li className="profile-li">
                      <a className="profile-a" href="/my-profile">
                        Edit Profile
                        </a>
                    </li> */}
          {!isFollower.includes(reply.user.id) && (
                    <li className="profile-li-c">
                      <div
                        className="profile-a-c"

                        onClick={(e) => {
                          {handleAddFollow(e, reply.user_id); setShowCommentMenu(!showCommentMenu)}
                        }}
                        >
                        Follow
                      </div>
                    </li>
                      )}
                  </ul>
                )}
      </div>
      </div>

        {!showEditForm && (
      <div className="comment-body-comment-r-modal">

          {reply.reply}
      </div>
        )}
             {showEditForm && (

<div className="comment-body-comment">
<form
  onSubmit={(e) => {
    handleEditReply(e, reply.id);
  }}
>
  <div className="add-comment-container">
    <textarea className="add-comment-textarea-r"
      name="Edit Comment"
      placeholder={reply.reply}
      value={updatedReply}
      onChange={(e) => setUpdatedReply(e.target.value)}
      ></textarea>
<button className="post-comment-button" type="submit">Submit</button>
  </div>
</form>
</div>

)}

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


      {/* {reply.user_id === user.id && (
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
      )} */}



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
