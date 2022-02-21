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

const Comment = ({ comment }) => {
  // const [isLoaded, setIsLoaded] = useState(false)
  // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReplyAddForm, setReplyAddShowForm] = useState(false);

  //   const [showForm, setShowForm] = useState(false);

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

  return (
    <>
      <div>
        User: {comment.user.username}
        {isFollower.includes(comment.user.id) && (
          <button
            onClick={(e) => {
              handleAddFollow(e, comment.user_id);
            }}
          >
            Unfollow
          </button>
        )}
        {!isFollower.includes(comment.user.id) && (
          <button
            onClick={(e) => {
              handleAddFollow(e, comment.user_id);
            }}
          >
            follow
          </button>
        )}
        <div>
          <p>
          {comment.comment}
          </p>

          <button
            onClick={(e) => {
              handleAddLike(e, comment);
            }}
          >
            {comment.likes.length} Comment likes
          </button>
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

      {comment.replies.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
      <button onClick={(e) => setReplyAddShowForm(!showReplyAddForm)}>
        Reply to {comment.user.username}'s post
      </button>
      {showReplyAddForm && (
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
      )}
    </>
  );
};

export default Comment;
