from .db import db
# import os
# import finnhub

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)

    user = db.relationship("User", back_populates="likes")
    comments = db.relationship("Comment", back_populates="likes")
    # stock_discussion = db.relationship("StockDiscussion", back_populates="likes")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "comment_id": self.comment_id,
        }
