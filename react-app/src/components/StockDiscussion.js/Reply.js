import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editDiscussionComment, addCommentLike, deleteCommentLike, addNewFollower, deleteNewFollower } from "../../store/stockDiscussion";

const Reply = ({reply}) => {
    // const [isLoaded, setIsLoaded] = useState(false)
    // const ticker = useParams()
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  // const [updatedreply, setUpdatedreply] = useState("")


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



                  /* {isFollower.includes(reply.user.id) && (

                    <button onClick={(e) => {handleAddFollow(e, reply.user_id)}}>
                               unfollow
                          </button>
                    )}
                {!isFollower.includes(reply.user.id) && (

<button onClick={(e) => {handleAddFollow(e, reply.user_id)}}>
           follow
      </button>
)} */
    return (
        <>
            <div>
                User: {reply.user.username}

            <div>
            {reply.reply}

                {/* <button onClick={(e) => {handleAddLike(e, reply)}}>
                {reply.likes.length} likes
                </button> */}

            </div>
            </div>

   </>
  );
}

export default Reply;
