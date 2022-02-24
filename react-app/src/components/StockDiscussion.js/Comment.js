import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editDiscussionComment,
  delDiscussionComment,
} from "../../store/stockDiscussion";
import Reply from "./Reply";
import { addNewFollower, deleteNewFollower } from "../../store/followers";
import { addCommentLike, deleteCommentLike } from "../../store/likes";
import { addNewReply } from "../../store/replies";
import './comment.css'
import { Modal } from "../../Context/Modal";
import { ModalAuth } from "../../Context/ModalAuth";

const Comment = ({ comment, prop = false }) => {
  // const [isLoaded, setIsLoaded] = useState(false)
  // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReplyAddForm, setReplyAddShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(prop);
  const [errors, setErrors] = useState([]);
  //   const [showForm, setShowForm] = useState(false);
  const hideButtonStyle = {
    display: 'none',
}
  const user = useSelector((state) => state.session.user);

  // console.log("STOCK DIOSCUSS IN COMP", stockDiscussion)
  const handleEditComment = async (e, commentId) => {
    e.preventDefault();
    let id = commentId;
    let newComment = updatedComment;
    let errArr = []
    if(newComment.length < 1){
      errArr.push("You cannot submit a blank comment")
    }

    if(errArr.length){
      return setErrors(errArr)
    }
    await dispatch(editDiscussionComment(id, newComment));
    await setShowEditForm(!showEditForm);
    setShowEditModal(false)
    setShowCommentMenu(!showCommentMenu);
  };

  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault();
    let id = commentId;
    await dispatch(delDiscussionComment(id));
    document.body.style.overflow = 'unset';
  };

  const handleAddLike = (e, comment) => {
    e.preventDefault();
    console.log(comment);
    let commentId = comment.id;
    let user_id = user.id;

    let userLiked = comment.likes.filter((like) => {
      return like.user_id === user.id;
    });

    if (userLiked.length === 0) {
      dispatch(addCommentLike(commentId, user_id));
    }
    if (userLiked.length > 0) {
      let likeId = userLiked[0].id;
      dispatch(deleteCommentLike(likeId, user_id, commentId));
    }

    // setNewTick(!newTick)
  };

  const handleAddFollow = (e, id) => {
    e.preventDefault();
    console.log(id);
    let userToFollowId = id;
    let user_id = user.id;

    let currentlyFollowed = user.following.filter((follow) => {
      return follow.user_id === userToFollowId;
    });

    if (currentlyFollowed.length === 0) {
      dispatch(addNewFollower(userToFollowId, user_id));
    }

    if (currentlyFollowed.length > 0) {
      let followId = currentlyFollowed[0].id;

      dispatch(deleteNewFollower(followId, user_id, userToFollowId));
    }

    // setNewTick(!newTick)
  };

  const handleAddReply = (e) => {
    e.preventDefault();
    const reply = newReply;

    if(reply.length < 1){
      window.alert("You cannot submit a blank reply")
      return;
    }
    let user_id = user.id;
    let comment_id = comment.id;
    dispatch(addNewReply(reply, user_id, comment_id));
    setNewReply("");
    setReplyAddShowForm(!showReplyAddForm);
    // setNewTick(!newTick)
  };

  let isFollower = user.following.map((follow) => {
    return follow.user_id;
  });
  const openModal = () => {
    setShowModal(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = 'unset';
  }


 let hasLiked = comment.likes.filter(like =>{
   return like.user_id === user.id
 })


 const openCommentMenu = () => {
  setShowCommentMenu(!showCommentMenu);
};



  return (
    <>


      <div className="comment-container">
      <div className="comment-body-div-prof-pic">
        <img className="comment-body-prof-pic" src={comment.user.profile_picture}></img>
      </div>
      <div className="comment-body-container">
      <div className="comment-body-first-row">
      <div className="username-posted">
        <div className="comment-top-row-username">
        {comment.user.username}
        </div>
        <div className="comment-top-row-updated">
        {comment.profile_time}
        </div>
      </div>


      <div className="edit-container-c">

      <div onClick={openCommentMenu} className="comment-icon-container">
      <img className="edit-icon" src="https://img.icons8.com/ios/50/000000/more.png"/>
                        </div>
                </div>
      </div>
      {/* <div className="ul-container-c"> */}

      {showCommentMenu && user.id === comment.user_id && (
        <ul className="profile-ul-c">
                    <li className="profile-li-c">
                      <div onClick={() => setShowEditModal(!showEditModal)} className="profile-a-c">
                        Edit Comment
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
                          handleDeleteComment(e, comment.id);
                        }}
                        >
                        Delete Comment
                      </div>
                    </li>
                  </ul>
                )}



{showCommentMenu && user.id !== comment.user_id && (
        <ul className="profile-ul-f">
          {isFollower.includes(comment.user.id) && (
                    <li className="profile-li-c">
                      <div onClick={(e) => {handleAddFollow(e, comment.user_id); setShowCommentMenu(!showCommentMenu)}} className="profile-a-c">
                        Unfollow
                      </div>
                    </li>
 )}
                    {/* <li className="profile-li">
                      <a className="profile-a" href="/my-profile">
                        Edit Profile
                        </a>
                    </li> */}
          {!isFollower.includes(comment.user.id) && (
                    <li className="profile-li-c">
                      <div
                        className="profile-a-c"

                        onClick={(e) => {
                          {handleAddFollow(e, comment.user_id); setShowCommentMenu(!showCommentMenu)}
                        }}
                        >
                        Follow
                      </div>
                    </li>
                      )}
                  </ul>
                )}


                {/* </div> */}
      <div className="comment-body-comment">
            {comment.comment}
      </div>

      <div className="comment-body-bottom-row">
        <div>

      <div className="comment-icon-container" onClick={openModal}>
        <div>

      <img className="comment-icon" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-comment-chat-flatart-icons-outline-flatarticons-1.png"/>
      </div>

        <div>
        {comment.replies.length}
          </div>
      </div>
      {/* {true && (
        <form onSubmit={handleAddReply}>
          <div>
            <input
              name="Add Reply"
              placeholder="Enter your reply here.."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </div>
        </form>
      )} */}
        </div>
        <div>
        <div className="comment-icon-container-like"
            onClick={(e) => {
              handleAddLike(e, comment);
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
            {comment.likes.length}
              </div>
          </div>
        </div>

      </div>


            {showEditModal && (
              <>
              <ModalAuth onClose={() => setShowEditModal(false)}>
                <>


        </>
        <div className='login-modal-title'>
      Edit Comment
    </div>
        <form
        onSubmit={(e) => {
          handleEditComment(e, comment.id);
          }}
        >
                <div className="error-login">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
          <div>
            <input
            className='login-modal-input'
              name="Edit Comment"
              placeholder={comment.comment}
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            ></input>
             <div className='modal-login-button-container'>
            <button className='login-splash-button-modal' type="submit">Submit</button>
            </div>
          </div>
        </form>

      </ModalAuth>

                </>
        )}

      <br></br>
{/*
      {comment.replies.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))} */}
              </div>
    </div>
    {showModal && (
      <Modal onClose={closeModal}>
        <div className="top-of-modal-message">

        Message

        </div>
        <div className="comment-modal-container">

     <div className="comment-container">
     <div className="comment-body-div-prof-pic">
       <img className="comment-body-prof-pic" src={comment.user.profile_picture}></img>
     </div>
     <div className="comment-body-container">
     <div className="comment-body-first-row">
     <div className="username-posted">
       <div className="comment-top-row-username">
       {comment.user.username}
       </div>
       <div className="comment-top-row-updated">
         {comment.profile_time}
       </div>
     </div>
     <div>
     <img src="https://img.icons8.com/external-flat-icons-inmotus-design/67/000000/external-dot-browser-ui-elements-flat-icons-inmotus-design.png"/>
     </div>
     </div>
     <div className="comment-body-comment-modal">
           {comment.comment}
     </div>

     <div className="comment-body-bottom-row">

       <div className="comment-icon-container"
            onClick={(e) => {
              handleAddLike(e, comment);
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
            {comment.likes.length}
              </div>
          </div>
       {/* <div>
       {isFollower.includes(comment.user.id) && (
         <button
         onClick={(e) => {
           handleAddFollow(e, comment.user_id);
          }}
          >
           Unfollow {comment.user.username}
         </button>
       )}
       {!isFollower.includes(comment.user.id) && (
         <button
         onClick={(e) => {
           handleAddFollow(e, comment.user_id);
          }}
          >
           Follow {comment.user.username}
         </button>
       )}
       </div> */}

     </div>

     <br></br>
    </div>
   </div>
   <div>
<form onSubmit={handleAddReply}>
<div className="larger-comment-container">

              <img className="comment-prof-pic" src={user.profile_picture}>

</img>
<div className="add-comment-container">

  <textarea className="add-comment-textarea"
    name="Add Reply"
    placeholder={`Reply to ${comment.user.username}'s post`}
    value={newReply}
    onChange={(e) => setNewReply(e.target.value)}
    ></textarea>
  <button className="post-comment-button" type="submit">Post</button>
</div>
</div>
</form>
</div>
   {comment.replies.map((reply) => (
       <Reply key={reply.id} reply={reply} />
     ))}
    </div>
   </Modal>
    )}

    </>
  );
};

export default Comment;
