from flask import Blueprint, request
# import requests
# import os
from app.models import db, Follower, User
from datetime import datetime

follower_routes = Blueprint("follower", __name__)


@follower_routes.route('/new', methods=['POST'])
# @login_required
def new_follower():
    object = request.json
    user_to_follow_id = object['userToFollowId']
    user_id = object['user_id']
    new_follow = Follower(user_id=user_to_follow_id, follower_id=user_id)
    db.session.add(new_follow)
    db.session.commit()
    user = User.query.get(user_id)
    return user.to_dict()

@follower_routes.route("/delete/<int:followId>", methods=['DELETE'])
# @login_required
def delete_follower(followId):
    object = request.json
    user_id = object['user_id']
    follow_to_delete = Follower.query.filter(Follower.id == followId).all()
    for f in follow_to_delete:
        db.session.delete(f)
    db.session.commit()
    user = User.query.get(user_id)
    return user.to_dict()
