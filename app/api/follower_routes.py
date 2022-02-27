from flask import Blueprint, request, jsonify
# import requests
# import os
from app.models import db, Follower, User
from datetime import datetime

follower_routes = Blueprint("follower", __name__)

@follower_routes.route('/<int:id>')
def get_follower(id):
    print("here")
    print("id", id)
    followers = Follower.query.filter(Follower.user_id == id).all()
    print("FOLOWERS1", followers)
    my_followers = []
    for follower in followers:
        print("FOLLOWER2", follower.to_dict())
        user = User.query.get(follower.follower_id)
        print("USER", user.to_dict_basic())
        my_followers.append(user)
    print("MY FOLLOWERS", my_followers)
    return jsonify([f.to_dict_basic() for f in my_followers])

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
