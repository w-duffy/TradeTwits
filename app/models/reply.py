from .db import db
# import os
# import finnhub

class Reply(db.Model):
    __tablename__ = "replies"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    reply = db.Column(db.String(255), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)

    user = db.relationship("User", lazy='subquery', back_populates="replies")
    likes = db.relationship("Like", lazy='subquery', back_populates="replies")
    comments = db.relationship("Comment", lazy='subquery', back_populates="replies")

    def to_dict(self):

        profile_time = self.time_updated.strftime("%m/%d/%y, %I:%M %p")

        return {
            "id": self.id,
            "user_id": self.user_id,
            "comment_id": self.comment_id,
            "reply": self.reply,
            "time_created": self.time_created,
            "time_updated": profile_time,
            "likes": [like.to_dict() for like in self.likes],
            "user": self.user.to_dict_basic()
        }
