from flask import Blueprint, request
# import requests
# import os
from app.models import db, Comment, Reply, Like
from datetime import datetime

reply_routes = Blueprint("reply", __name__)


@reply_routes.route('/new', methods=['POST'])
# @login_required
def new_reply():
    object = request.json
    comment_id = object['comment_id']
    id = object['user_id']
    reply = object['reply']
    today = datetime.now()
    new_reply = Reply(user_id=id, reply=reply, comment_id=comment_id, time_created=today, time_updated=today)
    db.session.add(new_reply)
    db.session.commit()
    updated_comment_with_replies = Comment.query.get(comment_id)
    return updated_comment_with_replies.to_dict()



@reply_routes.route("/delete/<int:id>", methods=['DELETE'])
# @login_required
def delete_reply(id):
    object = request.json
    comment_id = object['commentId']
    reply_to_delete = Reply.query.get(id)
    likes_to_delete = Like.query.filter(Like.reply_id == id).all()
    for like in likes_to_delete:
        db.session.delete(like)
    db.session.delete(reply_to_delete)
    db.session.commit()
    updated_comment_with_delete = Comment.query.get(comment_id)

    return updated_comment_with_delete.to_dict()

@reply_routes.route("/edit/<int:id>", methods=['PUT'])
# @login_required
def edit_discussion_comment(id):
    object = request.json

    new_reply = object['editedReply']
    comment_id = object['commentId']
    today = datetime.now()
    reply_to_edit = Reply.query.get(id)

    reply_to_edit.reply = new_reply
    reply_to_edit.time_updated = today
    db.session.add(reply_to_edit)
    db.session.commit()
    updated_comment_with_new_reply = Comment.query.get(comment_id)

    return updated_comment_with_new_reply.to_dict()
