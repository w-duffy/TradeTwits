from flask import Blueprint, request
# import requests
# import os
from app.models import db, Follower, User
from datetime import datetime

follower_routes = Blueprint("follower", __name__)


@follower_routes.route('/new', methods=['POST'])
# @login_required
def new_follower():
    print("JERERERERE")
    object = request.json
    print("OBJECTTT", object)
    user_to_follow_id = object['userToFollowId']
    user_id = object['user_id']
    new_follow = Follower(user_id=user_to_follow_id, follower_id=user_id)
    print("new follow", new_follow)
    db.session.add(new_follow)
    db.session.commit()
    user = User.query.get(user_id)
    print("USERRRRRR", user.to_dict())
    return user.to_dict()

# @follower_routes.route("/delete/<int:id>", methods=['DELETE'])
# # @login_required
# def deletePortfolioTicker(id):
#     comment_to_delete = Comment.query.filter(Comment.id == id).all()
#     likes_to_delete = Like.query.filter(Like.comment_id == id).all()
#     for like in likes_to_delete:
#         db.session.delete(like)
#     delete_object = comment_to_delete[0]
#     print(delete_object.to_dict())
#     db.session.delete(delete_object)
#     db.session.commit()
#     return delete_object.to_dict()
