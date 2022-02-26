from .db import db

# import os
# import finnhub

class Follower(db.Model):
    __tablename__ = "followers"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    def to_dict(self):



        return {
            "id": self.id,
            "user_id": self.user_id,
            "follower_id": self.follower_id,

        }
