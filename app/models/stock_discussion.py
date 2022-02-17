from .db import db
import os
import finnhub

class StockDiscussion(db.Model):
    __tablename__ = "stockDiscussions"

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    comments = db.relationship("Comment", back_populates="stock_discussion")
    # user = db.relationship("User", back_populates="stock_discussion")
    # likes = db.relationship("Like", back_populates="stock_discussion")


    def to_dict(self):
        # #Code to pull the price for the ticker in the portfolio

        try:
            finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))

            p = finnhub_client.quote(self.ticker.upper())
            data = finnhub_client.symbol_lookup(self.ticker.upper())
            company_name_upper = data['result'][0]['description']
            company_name_lower = company_name_upper.lower()
            company_name = company_name_lower.title()
            price = p["l"]
            percent_change = p['dp']

        except:
            try:
                finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY3"))

                p = finnhub_client.quote(self.ticker.upper())
                data = finnhub_client.symbol_lookup(self.ticker.upper())
                company_name_upper = data['result'][0]['description']
                company_name_lower = company_name_upper.lower()
                company_name = company_name_lower.title()
                price = p["l"]
                percent_change = p['dp']
            except:
                finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))

                p = finnhub_client.quote(self.ticker.upper())
                data = finnhub_client.symbol_lookup(self.ticker.upper())
                company_name_upper = data['result'][0]['description']
                company_name_lower = company_name_upper.lower()
                company_name = company_name_lower.title()
                price = p["l"]
                percent_change = p['dp']


        return {
            "id": self.id,
            "name": company_name,
            "ticker": self.ticker,
            "comments": [comment.to_dict() for comment in self.comments],
            "price": price,
            "percent_change": percent_change
            # "likes": [like.to_dict() for like in self.likes],
        }
