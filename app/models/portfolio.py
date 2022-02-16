from .db import db
# import os
# import finnhub

class Portfolio(db.Model):
    __tablename__ = "portfolios"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ticker = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="portfolio")


    def to_dict(self):

        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "ticker": self.ticker,
        }
