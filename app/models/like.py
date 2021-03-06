from .db import db
# import os
# import finnhub

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"))
    reply_id = db.Column(db.Integer, db.ForeignKey("replies.id"))

    user = db.relationship("User", lazy='subquery', back_populates="likes")
    comments = db.relationship("Comment", lazy='subquery', back_populates="likes")
    replies = db.relationship("Reply", lazy='subquery', back_populates="likes")
    # stock_discussion = db.relationship("StockDiscussion", back_populates="likes")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "comment_id": self.comment_id,
            "reply_id": self.reply_id,
        }
