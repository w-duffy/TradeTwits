from flask import Blueprint, request, jsonify
# import requests
# import os
from app.models import db, Follower, User
from datetime import datetime

follower_routes = Blueprint("follower", __name__)

@follower_routes.route('/<int:id>')
def get_follower(id):
    err = User.query.get(id)
    print("ERRRRRRRRRRRR", err)
    if err is None:
        return {"error": 'error'}
    followers = Follower.query.filter(Follower.user_id == id).all()
    my_followers = []
    for follower in followers:
        user = User.query.get(follower.follower_id)
        my_followers.append(user)
    return jsonify([f.to_dict_basic() for f in my_followers])




@follower_routes.route('/following/<int:id>')
def get_following(id):
    err = User.query.get(id)
    print("ERRRRRRRRRRRR", err)
    if err is None:
        return {"error": "error"}
    followers = Follower.query.filter(Follower.follower_id == id).all()
    my_followers = []
    for follower in followers:
        user = User.query.get(follower.user_id)
        my_followers.append(user)
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
