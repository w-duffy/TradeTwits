from flask import Blueprint, request
# import requests
# import os
from app.models import db, Comment, Like


like_routes = Blueprint("like", __name__)

@like_routes.route("/new/<int:id>", methods=['POST'])
# @login_required
def add_like(id):
    object = request.json
    user_id = object['user_id']
    new_like = Like(user_id=user_id, comment_id=id)
    db.session.add(new_like)
    db.session.commit()
    comment_with_new_like = Comment.query.get(id)
    return comment_with_new_like.to_dict()

@like_routes.route("/delete/<int:likeId>", methods=['DELETE'])
# @login_required
def delete_like(likeId):
    object = request.json
    user_id = object['user_id']
    comment_id = object['commentId']
    like_to_delete = Like.query.filter(Like.id == likeId).all()
    for like in like_to_delete:
        db.session.delete(like)
    db.session.commit()
    comment_with_deleted_like = Comment.query.get(comment_id)
    return comment_with_deleted_like.to_dict()
