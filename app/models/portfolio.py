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

        # #Code to pull the price for the ticker in the portfolio
        # try:
        #     finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))

        #     price = finnhub_client.quote(self.ticker.upper())

        #     #Calculate value and gain/loss
        #     value = price["c"] * self.quantity
        #     gain_loss = value - (self.quantity * self.average_price)
        # except:
        #     finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY3"))

        #     price = finnhub_client.quote(self.ticker.upper())

        #     #Calculate value and gain/loss
        #     value = price["c"] * self.quantity
        #     gain_loss = value - (self.quantity * self.average_price)

        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "ticker": self.ticker,
        }
