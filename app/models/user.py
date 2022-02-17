from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follower import Follower


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String)
    bio = db.Column(db.String)

    portfolio = db.relationship("Portfolio", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    likes = db.relationship("Like", back_populates="user")
    replies = db.relationship("Reply", back_populates="user")
    following = []
    followers = []
    # watchlist = db.relationship("Watchlist", back_populates="user")
    # stock_discussion = db.relationship("StockDiscussion", back_populates="user")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        users_followers = Follower.query.filter(Follower.user_id == self.id).all()
        self.followers = [follower for follower in users_followers]

        users_following = Follower.query.filter(Follower.follower_id == self.id).all()
        self.following = [user_f for user_f in users_following]


        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_picture": self.profile_picture,
            "bio": self.bio,
            "portfolio": [port.to_dict() for port in self.portfolio],
            "comments": [comment.to_dict() for comment in self.comments],
            "likes": [like.to_dict() for like in self.likes],
            "followers": [f.to_dict() for f in self.followers],
            "following": [f.to_dict() for f in self.following]
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_picture": self.profile_picture,
            "bio": self.bio,
        }

    def to_dict_follower(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_picture": self.profile_picture,
            "bio": self.bio,
            "followers": [f.to_dict() for f in self.followers],
            "following": [f.to_dict() for f in self.following]
        }
