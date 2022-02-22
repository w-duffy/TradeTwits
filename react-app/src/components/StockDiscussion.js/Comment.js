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
const Comment = ({ comment }) => {
  // const [isLoaded, setIsLoaded] = useState(false)
  // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReplyAddForm, setReplyAddShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    await dispatch(editDiscussionComment(id, newComment));
    await setShowEditForm(!showEditForm);
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
          {comment.time_updated}
        </div>
      </div>
      <div> delete</div>
      </div>
      <div className="comment-body-comment">
            {comment.comment}
      </div>

      <div className="comment-body-bottom-row">
        <div>

      <button onClick={openModal}>
        Reply to {comment.user.username}'s post
      </button>
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
        <button className="comment-like-button"
            onClick={(e) => {
              handleAddLike(e, comment);
            }}
            >
            {comment.likes.length} Comment likes
          </button>
        </div>
        <div>
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
        </div>

      </div>


      {comment.user_id === user.id && (
        <>
          <button onClick={(e) => setShowEditForm(!showEditForm)}>
            EDIT COMMENT
          </button>
          <button
            onClick={(e) => {
              handleDeleteComment(e, comment.id);
            }}
            >
            DELETE COMMENT
          </button>
        </>
      )}
      {showEditForm && (
        <form
          onSubmit={(e) => {
            handleEditComment(e, comment.id);
          }}
        >
          <div>
            <input
              name="Edit Comment"
              placeholder={comment.comment}
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </div>
        </form>
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
         {comment.time_updated}
       </div>
     </div>
     <div> delete</div>
     </div>
     <div className="comment-body-comment">
           {comment.comment}
     </div>

     <div className="comment-body-bottom-row">
       {/* <div> */}

     {/* <button onClick={(e) => setReplyAddShowForm(!showReplyAddForm)}>
       Reply to {comment.user.username}'s post
     </button> */}

      {/* //  <form onSubmit={handleAddReply}>
      //    <div>
      //      <input */}
      {/* //        name="Add Reply"
      //        placeholder="Enter your reply here.."
      //        value={newReply}
      //        onChange={(e) => setNewReply(e.target.value)}
      //      ></input>
      //      <button type="submit">Submit</button>
      //    </div>
      //  </form> */}

       {/* </div> */}
       <div>
       <button
           onClick={(e) => {
             handleAddLike(e, comment);
           }}
           >
           {comment.likes.length} Comment likes
         </button>
       </div>
       <div>
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
       </div>

     </div>


     {comment.user_id === user.id && (
       <>
         <button onClick={(e) => setShowEditForm(!showEditForm)}>
           EDIT COMMENT
         </button>
         <button
           onClick={(e) => {
             handleDeleteComment(e, comment.id);
            }}
            >
           DELETE COMMENT
         </button>
       </>
     )}
     {showEditForm && (
       <form
         onSubmit={(e) => {
           handleEditComment(e, comment.id);
         }}
       >
         <div>
           <input
             name="Edit Comment"
             placeholder={comment.comment}
             value={updatedComment}
             onChange={(e) => setUpdatedComment(e.target.value)}
           ></input>
           <button type="submit">Submit</button>
         </div>
       </form>
     )}




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
