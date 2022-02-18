from flask import Blueprint, request
# import requests
# import os
from app.models import db, Comment, Reply
from datetime import datetime

reply_routes = Blueprint("reply", __name__)


@reply_routes.route('/new', methods=['POST'])
# @login_required
def new_reply():
    object = request.json
    print("object", object)
    comment_id = object['comment_id']
    id = object['user_id']
    reply = object['reply']
    today = datetime.now()
    new_reply = Reply(user_id=id, reply=reply, comment_id=comment_id, time_created=today, time_updated=today)
    db.session.add(new_reply)
    db.session.commit()
    updated_comment_with_replies = Comment.query.get(comment_id)
    return updated_comment_with_replies.to_dict()



# @reply_routes.route("/delete/<int:id>", methods=['DELETE'])
# # @login_required
# def deletePortfolioTicker(id):
#     comment_to_delete = Comment.query.filter(Comment.id == id).all()
#     likes_to_delete = Like.query.filter(Like.comment_id == id).all()
#     replies_to_delete = Reply.query.filter(Reply.comment_id == id).all()
#     for reply in replies_to_delete:
#         reply_likes = Like.query.filter(Like.reply_id == reply.id).all()
#         for l in reply_likes:
#             db.session.delete(l)
#         db.session.delete(reply)
#     for like in likes_to_delete:
#         db.session.delete(like)
#     delete_object = comment_to_delete[0]
#     print(delete_object.to_dict())
#     db.session.delete(delete_object)
#     db.session.commit()
#     return delete_object.to_dict()

# @stock_discussion_routes.route("/edit/<int:id>", methods=['PUT'])
# # @login_required
# def edit_discussion_comment(id):
#     object = request.json
#     new_comment = object['newComment']
#     today = datetime.now()
#     comment_to_edit = Comment.query.get(id)
#     comment_to_edit.comment = new_comment
#     comment_to_edit.time_updated = today
#     db.session.add(comment_to_edit)
#     db.session.commit()
#     return comment_to_edit.to_dict()
