from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follower import Follower
import finnhub
import os
import requests

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String, default="https://w7.pngwing.com/pngs/906/222/png-transparent-computer-icons-user-profile-avatar-french-people-computer-network-heroes-black.png")
    bio = db.Column(db.String, default="My bio...")

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

        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))
            p = finnhub_client.quote("DIA")
            dow_price = p["c"]
            dow_percent_change = p['dp']
        except:
            dow_price = "N/A"
            dow_percent_change = "N/A"
        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY3"))
            p = finnhub_client.quote("SPY")
            sp_price = p["l"]
            sp_percent_change = p['dp']
        except:
            sp_price = "N/A"
            sp_percent_change = "N/A"
        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY3"))
            p = finnhub_client.quote("QQQ")
            nas_price = p["l"]
            nas_percent_change = p['dp']
        except:
            nas_price = "N/A"
            nas_percent_change = "N/A"
        url = "https://yh-finance.p.rapidapi.com/market/get-trending-tickers"

        querystring = {"region":"US"}

        headers = {
    'x-rapidapi-host': "yh-finance.p.rapidapi.com",
    'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
    }

        response = requests.request("GET", url, headers=headers, params=querystring)
        this = response.json()
        obj = this['finance']['result']
        obj1 = obj[0]
        quotes = obj1['quotes']
        data = {}
        for quote in quotes:
            symbol = quote['symbol']
            p_change = quote['regularMarketChangePercent']
            data[symbol] = p_change




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
        "following": [f.to_dict() for f in self.following],
        # "dow_price": dow_price,
        "dow_percent_change": dow_percent_change,
        # "sp_price": sp_price,
        "sp_percent_change": sp_percent_change,
        # "nas_price": nas_price,
        "nas_percent_change": nas_percent_change,
        "trending": data,
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
            "following": [f.to_dict() for f in self.following],
        }
