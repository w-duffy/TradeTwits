from .db import db
# import os
# import finnhub

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    stock_discussion_id = db.Column(db.Integer, db.ForeignKey("stockDiscussions.id"), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)

    user = db.relationship("User", back_populates="comments")
    likes = db.relationship("Like", back_populates="comments")
    stock_discussion = db.relationship("StockDiscussion", back_populates="comments")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stock_discussion_id": self.stock_discussion_id,
            "comment": self.comment,
            "time_created": self.time_created,
            "time_updated": self.time_updated,
            "likes": [like.to_dict() for like in self.likes],
        }
