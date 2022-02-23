from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/edit/<int:id>', methods=["POST"])
@login_required
def edit_user(id):
    object = request.json
    new_bio = object['newBio']
    new_prof_pic = object['newProfilePic']
    user = User.query.get(id)
    user.bio = new_bio
    user.profile_picture = new_prof_pic
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
