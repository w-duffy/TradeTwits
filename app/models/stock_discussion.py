from .db import db
import os
import finnhub

class StockDiscussion(db.Model):
    __tablename__ = "stockDiscussions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ticker = db.Column(db.String, nullable=False)
    comments = db.relationship("Comment", back_populates="stock_discussion")
    # user = db.relationship("User", back_populates="stock_discussion")
    # likes = db.relationship("Like", back_populates="stock_discussion")


    def to_dict(self):
        # #Code to pull the price for the ticker in the portfolio
        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))

            p = finnhub_client.quote(self.ticker.upper())

            price = p["c"]

        except:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY3"))

            p = finnhub_client.quote(self.ticker.upper())

            price = p["c"]


        return {
            "id": self.id,
            "name": self.name,
            "ticker": self.ticker,
            "comments": [comment.to_dict() for comment in self.comments],
            "price": price
            # "likes": [like.to_dict() for like in self.likes],
        }
