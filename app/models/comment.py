from .db import db
# import os
# import finnhub
from .stock_discussion import StockDiscussion
from datetime import datetime
from operator import attrgetter

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    stock_discussion_id = db.Column(db.Integer, db.ForeignKey("stockDiscussions.id"), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)

    user = db.relationship("User", lazy='subquery', back_populates="comments")
    likes = db.relationship("Like", lazy='subquery', back_populates="comments")
    replies = db.relationship("Reply", lazy='subquery', back_populates="comments")
    stock_discussion = db.relationship("StockDiscussion", back_populates="comments")


    def to_dict(self):
        discussion = StockDiscussion.query.get(self.stock_discussion_id)
        data =  discussion.to_dict_basic()
        ticker = data['ticker']

        profile_time = self.time_updated.strftime("%m/%d/%y, %I:%M %p")

        return {
            "id": self.id,
            "user_id": self.user_id,
            "stock_discussion_id": self.stock_discussion_id,
            "comment": self.comment,
            "time_created": self.time_created,
            "time_updated": self.time_updated,
            "likes": [like.to_dict() for like in self.likes],
            "replies": [reply.to_dict() for reply in self.replies],
            "user": self.user.to_dict_basic(),
            "discussion_ticker": ticker,
            "profile_time": profile_time
        }
